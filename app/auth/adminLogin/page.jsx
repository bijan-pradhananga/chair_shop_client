"use client"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LoginSchema } from "@/schemas";
import { FormError } from "@/components/ui/formerror";
import { FormSuccess } from "@/components/ui/formsuccess";
import { login } from "@/actions/user";
import { useState, useTransition } from "react";

const AdminLogin = () => {
    const [isPending, startTransition] = useTransition();
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const form = useForm({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    });

    const onSubmit = (values) => {
        setSuccess("");
        setError("");
        startTransition(() => {
            login(values)
                .then((data) => {
                    setSuccess(data?.success ?? ''); 
                    setError(data?.error ?? '');  
                })
        })

    }
    return (
        <Card className="w-full max-w-md shadow-input">
            <LoginHeader />
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem className="mb-1">
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="joe@gmail.com" disabled={isPending} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem >
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="*************" type="password" disabled={isPending} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormSuccess message={success} />
                        <FormError message={error} />
                        <Button type="submit" className="mt-4 w-full -mb-1" disabled={isPending}>Login</Button>
                    </form>

                </Form>
            </CardContent>
        </Card>
    )
}

export default AdminLogin

const LoginHeader = () => {
    return (
        <CardHeader>
            <CardTitle className="text-2xl">Admin Login</CardTitle>
        </CardHeader>
    )
}


