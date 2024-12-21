"use client";
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import CartComponent from '@/components/cart-component';
import CheckOutForm from '@/components/checkOut-form';
import { fetchCart } from '@/lib/features/cart';
import ServerErrorPage from '@/components/design/serverError';
import CartLoader from '@/components/loader/cartLoader';

const CartPage = () => {
    const { data: session } = useSession();
    const dispatch = useAppDispatch();
    const { data: cartItems, error, isLoading, total } = useAppSelector((state) => state.cart);


    const HandleFetchCart = async () => {
        if (session && session.user.id) {
            const userId = session.user.id
            dispatch(fetchCart(userId));
        }
    }
    useEffect(() => {
        HandleFetchCart();
    }, [dispatch]);


    if (error) {
        return <ServerErrorPage />
    }
    return (
        <main className="bg-white antialiased dark:bg-gray-900">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
                Shopping Cart
            </h2>
            {isLoading ? (
                <CartLoader />
            ) : cartItems.length === 0 ? (
                <div>Empty</div>
            ) : (
                <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
                    <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
                        <div className="space-y-6">
                            {
                                cartItems.map((item) => <CartComponent key={item._id} item={item} />)
                            }
                        </div>
                    </div>
                    <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
                        <CheckOutForm />
                    </div>
                </div>
            )}
        </main>
    );
};

export default CartPage;
