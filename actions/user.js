"use server"

import { compare, hash } from "bcryptjs";
import { LoginSchema, RegisterSchema } from "@/schemas";
import { signIn } from "@/auth";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { AuthError } from "next-auth";
import { DEFAULT_ADMIN_LOGIN_REDIRECT, DEFAULT_LOGIN_REDIRECT } from "@/routes/routes";


export const login = async (values) => {
    const validatedFields = LoginSchema.safeParse(values);
    if (!validatedFields.success) {
        return { error: "Invalid Field" }
    }
    const { email, password } = validatedFields.data;
    try {
        await connectDB();
        const existingUser = await User.findOne({ email }).select("+password");
        if (!existingUser || !existingUser.email || !existingUser.password) {
            return { error: "Email does not exist" }
        }
        const isMatched = await compare(password, existingUser.password);
        if (!isMatched) {
            return { error: "Invalid Password" }
        }
        const redirectUrl = existingUser.role === 'admin' ? DEFAULT_ADMIN_LOGIN_REDIRECT : DEFAULT_LOGIN_REDIRECT;
        await signIn("credentials", {
            email, password,
            redirectTo: redirectUrl
        })
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return { error: "Invalid Credentials" }
                default:
                    return { error: "Internal server error" }
            }
        }
        throw error;
    }
}

export const register = async (values) => {
    const validatedFields = RegisterSchema.safeParse(values);
    if (!validatedFields.success) {
        return { error: "Invalid Field" };
    }
    const { name, email, password } = validatedFields.data;
    const hashedPassword = await hash(password, 10);
    try {
        await connectDB();
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return { error: "User already exists with this email" };
        };
        await User.create({
            name,
            email,
            password: hashedPassword
        });

        return { success: "User Registered Successfully" }
    } catch (error) {
        console.error("Error inserting user:", error);
        return { error: "Internal server error" };
    }

}

// export const LoginViaSocials = async (provider: 'google' | 'github') => {
//     await signIn(provider, {
//         callbackUrl: DEFAULT_LOGIN_REDIRECT
//     });
// };
