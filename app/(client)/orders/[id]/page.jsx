"use client";

import NotFoundPage from "@/components/design/404notFound";
import GlobalLoader from "@/components/loader/globalLoader";
import API from "@/config/config";
import { fetchSingleOrder } from "@/lib/features/order";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect } from "react";

const OrderDetails = () => {
    const dispatch = useAppDispatch();
    const { singleData, error, isLoading } = useAppSelector((state) => state.order);
    const params = useParams();

    const id = params.id;
    if (!id) {
        return <NotFoundPage />;
    }

    useEffect(() => {
        dispatch(fetchSingleOrder(id));
    }, [dispatch]);

    if (isLoading && !singleData.items) {
        return <GlobalLoader/>;
    }


    if (error) {
        return <NotFoundPage />;
    }



    return (
        <>
            <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
                <form action="#" className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                    <div className="mx-auto max-w-3xl">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
                            Order summary
                        </h2>
                        <div className="mt-6 sm:mt-8">
                            <div className="relative overflow-x-auto border-b border-gray-200 dark:border-gray-800">
                                <table className="w-full text-left font-medium text-gray-900 dark:text-white md:table-fixed">
                                    <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                                        {singleData?.items?.length > 0 ? (
                                            singleData.items.map((item, index) => (
                                                <tr key={index}>
                                                    <td className="whitespace-nowrap py-4 md:w-[384px]">
                                                        <div className="flex items-center gap-4">
                                                            <div
                                                                href="#"
                                                                className="flex items-center aspect-square w-20 h-20 rounded shrink-0"
                                                            >
                                                                <img
                                                                    className="h-auto w-full max-h-full"
                                                                    src={`${API.defaults.baseURL}/${item.product.images[0]}`}
                                                                    alt="product image"
                                                                />
                                                            </div>
                                                            <a href="#" className="hover:underline">
                                                                {item.product?.name || "Product Name"}
                                                            </a>
                                                        </div>
                                                    </td>
                                                    <td className="p-4 text-base font-normal text-gray-900 dark:text-white">
                                                        x{item.quantity}
                                                    </td>
                                                    <td className="p-4 text-right text-base font-bold text-gray-900 dark:text-white">
                                                        Rs.{item.price * item.quantity}
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="3" className="text-center py-4">
                                                    No items found in this order.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>

                                </table>
                            </div>
                            <div className="mt-4 space-y-6">
                                <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                                    Billing Information
                                </h4>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <dl className="flex items-center justify-between gap-4">
                                            <dt className="text-gray-500 dark:text-gray-400">
                                                Name
                                            </dt>
                                            <dd className="text-base font-medium text-gray-900 dark:text-white">
                                                {singleData?.billingInfo?.name}
                                            </dd>
                                        </dl>
                                        <dl className="flex items-center justify-between gap-4">
                                            <dt className="text-gray-500 dark:text-gray-400">
                                                Email
                                            </dt>
                                            <dd className="text-base font-medium text-gray-900 dark:text-white">
                                                {singleData?.billingInfo?.email}
                                            </dd>
                                        </dl>
                                        <dl className="flex items-center justify-between gap-4">
                                            <dt className="text-gray-500 dark:text-gray-400">
                                                Phone
                                            </dt>
                                            <dd className="text-base font-medium text-gray-900 dark:text-white">
                                                {singleData?.billingInfo?.phone}
                                            </dd>
                                        </dl>
                                        <dl className="flex items-center justify-between gap-4">
                                            <dt className="text-gray-500 dark:text-gray-400">
                                                Address
                                            </dt>
                                            <dd className="text-base font-medium text-gray-900 dark:text-white">
                                                {singleData?.billingInfo?.address?.street}, {singleData?.billingInfo?.address?.city}, {singleData?.billingInfo?.address?.country}
                                            </dd>
                                        </dl>
                                        <dl className="flex items-center justify-between gap-4">
                                            <dt className="text-gray-500 dark:text-gray-400">
                                                Payment Method
                                            </dt>
                                            <dd className="text-base font-medium text-gray-900 dark:text-white">
                                                {singleData?.billingInfo?.paymentMethod}
                                            </dd>
                                        </dl>
                                        <dl className="flex items-center justify-between gap-4">
                                            <dt className="text-gray-500 dark:text-gray-400">
                                                Payment Status
                                            </dt>
                                            <dd className="text-base font-medium text-gray-900 dark:text-white">
                                                {singleData?.paymentStatus}
                                            </dd>
                                        </dl>
                                    </div>
                                    <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                                        <dt className="text-lg font-bold text-gray-900 dark:text-white">
                                            Total
                                        </dt>
                                        <dd className="text-lg font-bold text-gray-900 dark:text-white">
                                            Rs.{singleData?.totalAmount}
                                        </dd>
                                    </dl>
                                
                                </div>

                                <div className="gap-4 sm:flex sm:items-center">
                                    <Link href='/product'>
                                        <button
                                            type="button"
                                            className="w-full rounded-lg  border border-gray-200 bg-white px-5  py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
                                        >
                                            Return to Shopping
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </section>
        </>
    );
}

export default OrderDetails;
