import AddToCartBtn from '@/components/add-to-cart-btn';
import { useState } from 'react';
import { Button } from './ui/button';

const ProductActionBtns = ({ product }) => {
    const [quantity, setQuantity] = useState(1);

    const handleIncrement = () => setQuantity((prev) => Math.min(prev + 1, product.stock)); // Increment, but not exceed stock
    const handleDecrement = () => setQuantity((prev) => Math.max(prev - 1, 1)); // Decrement, but not below 1

    return (
        <div className="mt-6 md:flex">
            {product.stock > 0 ? (
                <>
                    {/* Add to Cart Button */}
                    <AddToCartBtn product={product} quantity={quantity} />

                    {/* Quantity Selector */}
                    <div className="flex items-center gap-2 ml-4 mt-6 md:mt-0">
                        <span className="font-semibold">Quantity:</span>
                        <Button
                            className="cursor-pointer bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-medium rounded-md hover:bg-gray-300 dark:hover:bg-gray-600"
                            onClick={handleDecrement}
                            disabled={quantity === 1}
                        >
                            -
                        </Button>
                        <span className="px-4 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-md">
                            {quantity}
                        </span>
                        <Button
                            className="cursor-pointer bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-medium rounded-md hover:bg-gray-300 dark:hover:bg-gray-600"
                            onClick={handleIncrement}
                            disabled={quantity === product.stock}
                        >
                            +
                        </Button>
                    </div>
                </>
            ) : (
                /* Out of Stock Button */
                <Button
                variant="secondary"
                    className="text-black font-semibold rounded-md px-6 py-5 cursor-not-allowed"
                    disabled
                >
                    Out of Stock
                </Button>
            )}
        </div>
    );
};

export default ProductActionBtns;
