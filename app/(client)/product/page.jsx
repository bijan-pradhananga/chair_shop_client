"use client";
import Search from "@/components/admin-search-bar";
import ProductCardLoader from "@/components/loader/product-cardLoader";
import ProductCard from "@/components/product-card";
import SortBtn from "@/components/sort-btn";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useSearchParams } from "next/navigation";
import { clearSearch, fetchProducts, searchProducts } from "@/lib/features/product";
import PaginationComponent from "@/components/pages";
import ProductEmpty from "@/components/design/productEmpty";
import { Suspense, useEffect } from "react";
import ServerErrorPage from "@/components/design/serverError";

const ProductPage = () => {
    const dispatch = useAppDispatch();
    const { data, isLoading, total, totalPages, isSearched ,error} = useAppSelector((state) => state.product);
    const searchParams = useSearchParams();

    let limit = 8;
    let currentPage = 1;
    let sort = 'def';
    if (searchParams.get('page')) {
        currentPage = Number(searchParams.get('page'));
    }
    if (searchParams.get('sort')) {
        sort = searchParams.get('sort');
    }

    const fetchItems = () => {
        dispatch(clearSearch());
        dispatch(fetchProducts({ page: currentPage, limit, sort }));
    };

    const searchItems = (query) => {
        dispatch(searchProducts(query));
    };

    useEffect(() => {
        dispatch(fetchProducts({ page: currentPage, limit, sort }));
    }, [dispatch, currentPage, sort]);

    if (error) {
        return <ServerErrorPage/>
    }
    return (
        <section>
            <Header fetchItems={fetchItems} searchItems={searchItems} page={currentPage} />
            <div>
                {isLoading ? (
                    <main className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                        <ProductCardLoader count={limit} />
                    </main>
                ) : data.length === 0 ? (
                    <ProductEmpty />
                ) : (
                    <main className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                        {data.map((item, index) => (
                            <ProductCard key={index} product={item} />
                        ))}
                    </main>
                )}

                {/* Pagination */}
                {(!isSearched && total > 0) && (
                    <PaginationComponent
                        currentPage={currentPage}
                        totalPages={totalPages}
                        sort={sort}
                    />
                )}
            </div>
        </section>
    );
};

const Header = ({ fetchItems, searchItems, page }) => {
    return (
        <div className="w-full py-2 mb-4 border-b">
            <div className="flex h-16 justify-center items-center">
                <h2 className="hidden md:block text-xl font-semibold">Products</h2>
                <div className="ml-auto w-full md:w-fit gap-2 flex items-center justify-between lg:justify-normal">
                    <Search fetchItems={fetchItems} searchItems={searchItems} />
                    <SortBtn page={page} />
                </div>
            </div>
        </div>
    );
};

const Page = () => {
    return (
        <Suspense fallback={<main className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            <ProductCardLoader count={8} />
        </main>}>
            <ProductPage />
        </Suspense>
    );
};

export default Page;
