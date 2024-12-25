'use client'
import NotFoundPage from '@/components/design/404notFound';
import Link from "next/link"
import { useSearchParams } from 'next/navigation';

const PaymentSuccess = () => {
    const searchParams = useSearchParams()
 
    const orderId = searchParams.get('orderId')
    if (!orderId) {
        return <NotFoundPage/>
    }

    return (

        <div className="flex flex-col items-center justify-center py-12 space-y-4 md:py-24">
            <div className="flex flex-col items-center justify-center space-y-2 gap-y-4">
                <CircleCheckIcon className="h-12 w-12 text-gray-500 dark:text-gray-400" />
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Payment successful</h1>
                <p className="max-w-[600px] text-center text-gray-500 md:text-xl/relaxed dark:text-gray-400">
                    Your order ID #{orderId} has been confirmed and is now being processed. Thank you for shopping with us.
                </p>
            </div>
            <div className="flex">
                <Link
                    href="/orders"
                    className="flex-1 inline-flex items-center justify-center rounded-md p-2 hover:bg-gray-100  dark:hover:bg-gray-800 dark:hover:text-gray-50"
                    prefetch={false}
                >
                    View Orders
                </Link>
            </div>
        </div>


    );
}


function CircleCheckIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="12" cy="12" r="10" />
            <path d="m9 12 2 2 4-4" />
        </svg>
    )
}


function UserIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
        </svg>
    )
}

export default PaymentSuccess;