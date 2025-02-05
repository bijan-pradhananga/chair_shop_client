"use client"
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useTransition } from "react";
import { billingInfoSchema } from "@/schemas/order";
import { useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { fetchCart } from "@/lib/features/cart";
import AlertFailure from "@/components/alert-failure";
import { clearError, createOrder } from "@/lib/features/order";
import EmptyCart from "@/components/design/emptycart";
import ServerErrorPage from "@/components/design/serverError";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import GlobalLoader from "@/components/loader/globalLoader";

const CheckOutPage = () => {
    const { data: session } = useSession();
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { data: cartItems, totalPrice, total, isLoading: cartLoading, error: cartError } = useAppSelector((state) => state.cart);
    const { error } = useAppSelector((state) => state.order);
    const [isPending, startTransition] = useTransition();


    const form = useForm({
        resolver: zodResolver(billingInfoSchema),
        defaultValues: {
            name: session?.user?.name || "",
            email: session?.user?.email || "",
            phone: "",
            street: "",
            city: "",
            country: "",
            paymentMethod: "Cash on Delivery",
        },
    });


    const onSubmit = async (values) => {
        // Extract and structure data
        const data = {
            userId: session?.user?.id, // Assuming userId is part of the session data
            billingInfo: {
                name: values.name,
                email: values.email,
                phone: values.phone,
                address: {
                    street: values.street,
                    city: values.city,
                    country: values.country,
                },
                paymentMethod: values.paymentMethod
            },
        };

        // Dispatch the action
        startTransition(async () => {
            const res = await dispatch(createOrder(data));
            if (createOrder.fulfilled.match(res)) {
                router.push('/orders');
            }
        });
    };


    const HandleFetchCart = async () => {
        if (session && session.user.id) {
            const userId = session.user.id;
            dispatch(fetchCart(userId));
        }
    }

    useEffect(() => {
        HandleFetchCart();
    }, [dispatch]);

    if (cartLoading) {
        return <GlobalLoader />
    }

    if (!cartLoading && total == 0) {
        return <EmptyCart />
    }
    if (cartError) {
        return <ServerErrorPage />
    }
    return (
        <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
            <Header />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12 xl:gap-16">
                        <div className="min-w-0 flex-1 space-y-8">
                            <div className="space-y-4">
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                                    Delivery Details
                                </h2>
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Full Name</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        placeholder="John Doe"
                                                        type="text"
                                                        disabled={isPending}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        placeholder="john@example.com"
                                                        type="email"
                                                        disabled={isPending}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="street"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Street</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        placeholder="Bagbazaar"
                                                        type="text"
                                                        disabled={isPending}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="city"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>City</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        placeholder="KTM"
                                                        type="text"
                                                        disabled={isPending}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="country"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Country</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        placeholder="Nepal"
                                                        type="text"
                                                        disabled={isPending}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="phone"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Phone Number</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        placeholder="+977 9641237156"
                                                        type="number"
                                                        disabled={isPending}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    
                                </div>
                            </div>
                        </div>
                        <div className="mt-6 w-full space-y-6 sm:mt-8 lg:mt-0 lg:max-w-xs xl:max-w-md">
                            <OrderSummary cartItems={cartItems} totalPrice={totalPrice} />
                            <div className="space-y-3">
                                {isPending ? (
                                    <Button className="px-4 py-4" disabled>
                                        <Loader2 className="animate-spin" />
                                        Placing Order
                                    </Button>
                                ) : (
                                    <Button
                                        type="submit" className="px-4 py-4"
                                    >
                                        Place Order
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                </form>
            </Form>
            <AlertFailure
                isOpen={error}
                message={error}
                onClose={() => dispatch(clearError())}
            />
        </section>
    );
};

const OrderSummary = ({ cartItems, totalPrice }) => {
    return (
        <div className="flow-root">
            <div className="-my-3 divide-y divide-gray-200 dark:divide-gray-800">
                {cartItems.map((item, index) => (
                    <dl className="flex items-center justify-between gap-4 py-3" key={index}>
                        <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                            {`${item.product.name} x ${item.quantity}`}
                        </dt>
                        <dd className="text-base font-medium text-gray-900 dark:text-white">
                            Rs. {item.product.price * item.quantity}
                        </dd>
                    </dl>
                ))}
                <dl className="flex items-center justify-between gap-4 py-3">
                    <dt className="text-base font-bold text-gray-900 dark:text-white">
                        Total
                    </dt>
                    <dd className="text-base font-bold text-gray-900 dark:text-white">
                        Rs. {totalPrice}
                    </dd>
                </dl>
            </div>
        </div>
    )
}

const Header = () => {
    return (
        <ol className="items-center flex w-full max-w-2xl text-center text-sm font-medium text-gray-500 dark:text-gray-400 sm:text-base">
            <li className="after:border-1 flex items-center text-primary-700 after:mx-6 after:hidden after:h-1 after:w-full after:border-b after:border-gray-200 dark:text-primary-500 dark:after:border-gray-700 sm:after:inline-block sm:after:content-[''] md:w-full xl:after:mx-10">
                <span className="flex items-center after:mx-2 after:text-gray-200 after:content-['/'] dark:after:text-gray-500 sm:after:hidden">
                    <svg
                        className="me-2 h-4 w-4 sm:h-5 sm:w-5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                    </svg>
                    Cart
                </span>
            </li>
            <li className="after:border-1 flex items-center text-primary-700 after:mx-6 after:hidden after:h-1 after:w-full after:border-b after:border-gray-200 dark:text-primary-500 dark:after:border-gray-700 sm:after:inline-block sm:after:content-[''] md:w-full xl:after:mx-10">
                <span className="flex items-center after:mx-2 after:text-gray-200 after:content-['/'] dark:after:text-gray-500 sm:after:hidden">
                    <svg
                        className="me-2 h-4 w-4 sm:h-5 sm:w-5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                    </svg>
                    Checkout
                </span>
            </li>
            <li className="flex shrink-0 items-center">
                <svg
                    className="me-2 h-4 w-4 sm:h-5 sm:w-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                </svg>
                Order summary
            </li>
        </ol>
    )
}

export default CheckOutPage