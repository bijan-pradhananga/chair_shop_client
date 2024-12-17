"use client"
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { addBrand, clearError, clearSuccess } from "@/lib/features/brand";
import AlertSuccess from "@/components/alert-success";
import AlertFailure from "@/components/alert-failure";
import { brandFormSchema } from "@/schemas/brand";

const AddBrandPage = () => {
    const dispatch = useAppDispatch();
    const { success, error } = useAppSelector((state) => state.brand);
    const [isPending, startTransition] = useTransition();

    const form = useForm({
        resolver: zodResolver(brandFormSchema),
        defaultValues: {
            name: '',
            description: '',
        },
    });

    const onSubmit = async (data) => {
        startTransition(() => {
            dispatch(addBrand(data));
            form.reset();
        })
    };
    return (
        <div>
            <Header />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="Brand Name" disabled={isPending} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea {...field} placeholder="Brand Description" disabled={isPending} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="px-4 py-2" disabled={isPending}>
                        Submit
                    </Button>
                </form>
            </Form>
            <AlertSuccess
                isOpen={success}
                message={success}
                onClose={() => dispatch(clearSuccess())}
            />
            <AlertFailure
                isOpen={error}
                message={error}
                onClose={() => dispatch(clearError())}
            />
        </div>
    )
}

const Header = () => {
    return (
        <header className="w-full bg-gray-100 rounded py-4 px-2 mb-4">
            <h1 className="text-2xl font-semibold">Add Brand</h1>
        </header>
    )
}

export default AddBrandPage