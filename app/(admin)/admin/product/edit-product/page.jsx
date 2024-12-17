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
import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectValue
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { clearError, clearSuccess, fetchSingleProduct, updateProduct } from "@/lib/features/product";
import AlertSuccess from "@/components/alert-success";
import AlertFailure from "@/components/alert-failure";
import { editProductFormSchema } from "@/schemas/product";
import { fetchCategory } from "@/lib/features/category";
import { fetchBrand } from "@/lib/features/brand";
import { useSearchParams } from "next/navigation";

const EditProductPage = () => {
    const dispatch = useAppDispatch();
    const { singleData, success, error, singleLoading } = useAppSelector((state) => state.product);
    const { data: categories } = useAppSelector((state) => state.category);
    const { data: brands } = useAppSelector((state) => state.brand);
    const [isPending, startTransition] = useTransition();
    const params = useSearchParams();
    const id = params.get('id');

    if (!id) {
        return <NotFoundPage />;
    }
    const form = useForm({
        resolver: zodResolver(editProductFormSchema),
        defaultValues: {
            name: '',
            description: '',
            price: 0,
            stock: 1,
            category: '',
            brand: '',

        },
    });
    useEffect(() => {
        if (id) {
            dispatch(fetchSingleProduct(id));
        }
        dispatch(fetchCategory());
        dispatch(fetchBrand());
    }, [id, dispatch])

    useEffect(() => {
        if (singleData && Object.keys(singleData).length > 0) {
            form.setValue('name', singleData.name);
            form.setValue('description', singleData.description);
            form.setValue('price', singleData.price);
            form.setValue('stock', singleData.stock);
            form.setValue('category', singleData.category._id);
            form.setValue('brand', singleData.brand._id);
        }
    }, [singleData]);
    if (singleLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <NotFound />;
    }


    const onSubmit = async (data) => {
        if (singleData?._id) {
            const formData = {
                name: data.name,
                description: data.description,
                price:data.price,
                stock:data.stock,
                category:data.category,
                brand:data.brand
            };
            startTransition(() => {
                dispatch(updateProduct({ id: singleData._id, formData }));
            })
        }
    };
    return (
        <div>
            <Header />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" >
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="Product Name" disabled={isPending} />
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
                                    <Textarea {...field} placeholder="Product Description" disabled={isPending} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Price</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="100.00" type="number" disabled={isPending} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="stock"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Stock</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="10" type="number" disabled={isPending} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Category</FormLabel>
                                <FormControl>
                                    <Select
                                        onValueChange={field.onChange} // Update the form value
                                        value={field.value} // Controlled input
                                        disabled={isPending} // Disable if needed
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {categories.map((item) => (
                                                <SelectItem key={item._id} value={item._id} >
                                                    {item.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="brand"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Brand</FormLabel>
                                <FormControl>
                                    <Select
                                        onValueChange={field.onChange} // Update the form value
                                        value={field.value} // Controlled input
                                        disabled={isPending} // Disable if needed
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a brand" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {brands.map((item) => (
                                                <SelectItem key={item._id} value={item._id}>
                                                    {item.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" disabled={isPending}>
                        Submit
                    </Button>
                    <Button type="button" onClick={() => window.history.back()} className="px-4 py-2 ml-2" disabled={isPending}>
                        Go Back
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
            <h1 className="text-2xl font-semibold">Edit Product</h1>
        </header>
    )
}
export default EditProductPage