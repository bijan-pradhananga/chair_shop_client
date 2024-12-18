import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials";
// import GitHub from "next-auth/providers/github"
// import Google from "next-auth/providers/google"
import { connectDB } from "./lib/db";
import User from "./models/User";
import { compare } from "bcryptjs";
import { LoginSchema } from "./schemas";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      authorize: async (credentials) => {
        const validatedFields = LoginSchema.safeParse(credentials);
        if (validatedFields.success) {
          const { email, password } = validatedFields.data;
          await connectDB()
          const user = await User.findOne({ email }).select("+password +role");
          if (!user) return null;
          if (!user.password) return null;
          const isMatched = await compare(password, user.password);
          if (!isMatched) return null;
          return user;
        }
        return null;
      }
    }),
    // GitHub({
    //   clientId: process.env.GITHUB_CLIENT_ID,
    //   clientSecret: process.env.GITHUB_CLIENT_SECRET
    // }),
    // Google({
    //   clientId: process.env.GOOGLE_CLIENT_ID,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET
    // })
  ],
  pages: {
    signIn: '/auth/login'
  },
//   events:{
//     async linkAccount({user}){
//       await connectDB();
//       await User.findByIdAndUpdate( user.id,
//         { emailVerified: new Date() } 
//       );
//     }
//   },
  callbacks: {
    async session({ session, token }) {
      if (token?.sub && token?.role) {
        session.user.id = token.sub;
        session.user.role = token.role;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
      }
      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
})