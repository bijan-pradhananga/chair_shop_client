"use client"
import NotFoundPage from '@/components/design/404notFound';
import ServerErrorPage from '@/components/design/serverError';
import ProductActionBtns from '@/components/product-action-btns';
import { Button } from '@/components/ui/button';
import ProductImages from '@/components/image-container';
import { fetchSingleProduct } from '@/lib/features/product';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import SingleProductLoader from '@/components/loader/single-product-loader';

const Page = () => {
  const dispatch = useAppDispatch();
  const { singleData, error, singleLoading } = useAppSelector((state) => state.product);
 
  const params = useParams()
  const id = params.id;
  
  if (!id) {
    return <NotFoundPage />
  }
  useEffect(() => {
    dispatch(fetchSingleProduct(id));
  }, [dispatch,id]);

  if (error) {
    return <NotFoundPage />
  }
  return (
    <main className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16 md:mt-10 mb-20">
      {singleLoading ? (
        <SingleProductLoader />
      ) : (
        <>
          <ProductImages name={singleData.name} images={singleData.images} />
          <ProductDescription product={singleData}  />
        </>
      )}

    </main>

  )
}


const ProductDescription = ({ product }) => {
  return (
    <div className="mt-6 sm:mt-8 lg:mt-0 ">
      {/* Product Name */}
      <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
        {product.name}
      </h1>

      {/* Product Price */}
      <div className="mt-4 sm:items-center sm:gap-4 sm:flex">
        <p className="text-2xl font-extrabold text-gray-900 sm:text-3xl dark:text-white">
          Rs.{product.price}
        </p>
      </div>

      {/* Action Buttons */}
      <ProductActionBtns product={product}  />

      {/* Category and Brand */}
      <div className="mt-6 flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-md text-gray-700 dark:text-gray-400">
            Category:
          </span>
          <Button variant="secondary" className="font-semibold">
            {product.category.name}
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-md  text-gray-700 dark:text-gray-400">
            Brand:
          </span>
          <Button variant="secondary" className="font-semibold">
            {product.brand.name}
          </Button>
        </div>
      </div>

      {/* Separator */}
      <hr className="my-6 md:my-8 border-gray-200 dark:border-gray-800" />

      {/* Product Description */}
      <p className="mb-6 text-gray-500 dark:text-gray-400">
        {product.description}
      </p>
    </div>
  );
};


export default Page