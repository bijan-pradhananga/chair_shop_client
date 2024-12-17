"use client";
import { clearError, clearSearch, clearSuccess, deleteProduct, deleteProductImg, fetchProducts, fetchSingleProduct, searchProducts, setSearch, updateProductImage } from "@/lib/features/product";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Suspense, useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import TableLoader from "@/components/loader/table-loader";
import TableEmpty from "@/components/empty-table";
import AlertSuccess from "@/components/alert-success";
import AlertFailure from "@/components/alert-failure";
import Link from "next/link";
import Search from "@/components/admin-search-bar";
import EditImageDialog from "@/components/image-popup";
import { useSearchParams } from "next/navigation";
import PaginationComponent from "@/components/pages";


const ProductPage = () => {
    const dispatch = useAppDispatch();
    const { data, isLoading, success, error, singleData, total, totalPages, isSearched } = useAppSelector((state) => state.product);
    const searchParams = useSearchParams();
    let currentPage = 1;
    if (searchParams.get('page') ) {
        currentPage = Number(searchParams.get('page'))
    }
    
    const [isModalOpen, setModalOpen] = useState(false);
    
    const handleDelete = async (id) => {
        let confirm = window.confirm("Are you sure you want to delete this product?");
        if (confirm) {
            const result = await dispatch(deleteProduct(id));
            if (deleteProduct.fulfilled.match(result)) {
                dispatch(fetchProducts({ page: currentPage, limit: 10 }));
            }
        }
    };

    const handleDeleteImage = async (id, imageName) => {
        let confirm = window.confirm("Are you sure you want to delete this product?");
        if (confirm) {
            const result = await dispatch(deleteProductImg({ id, imageName }));
            if (deleteProductImg.fulfilled.match(result)) {
                dispatch(fetchSingleProduct(id));
            }
        }
    }

    const handleUpdateImage = async (id, formData) => {
        const result = await dispatch(updateProductImage({ id, formData }));
        if (updateProductImage.fulfilled.match(result)) {
            dispatch(fetchSingleProduct(id));
        }
    }

    const fetchItems = () =>{
        dispatch(clearSearch());
        dispatch(fetchProducts({ page: currentPage, limit: 10 }));
    }

    const searchItems = (query) => {
        dispatch(searchProducts(query));
    };

    // Open the modal and set the selected product
    const handleEditImage = async (id) => {
        await dispatch(fetchSingleProduct(id));
        setModalOpen(true);
    };

    useEffect(() => {
        dispatch(fetchProducts({ page: currentPage, limit: 10 }));
    }, [dispatch,currentPage]);

    return (
        <div>
            <div className="hidden flex-col md:flex">
                <Header fetchItems={fetchItems} searchItems={searchItems} />
                <>
                    {isLoading ? (
                        <TableLoader />
                    ) : data.length === 0 ? (
                        <TableEmpty />
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[100px]">#</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead>Price</TableHead>
                                    <TableHead>Category</TableHead>
                                    <TableHead>Brand</TableHead>
                                    <TableHead>Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {data.map((item, index) => (
                                    <TableRow key={item._id}>
                                        <TableCell className="font-medium">{index + 1}</TableCell>
                                        <TableCell>{item.name}</TableCell>
                                        <TableCell className="max-w-xs">{item.description}</TableCell>
                                        <TableCell>{item.price}</TableCell>
                                        <TableCell>{item.category.name}</TableCell>
                                        <TableCell>{item.brand.name}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <Link
                                                    href={`product/edit-product?id=${item._id}`}
                                                    className="px-2 py-1 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600"
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(item._id)}
                                                    className="px-2 py-1 text-sm font-medium text-white bg-red-500 rounded hover:bg-red-600"
                                                >
                                                    Delete
                                                </button>
                                                <button
                                                    onClick={() => handleEditImage(item._id)}
                                                    className="px-2 py-1 text-sm font-medium text-white bg-green-500 rounded hover:bg-green-600"
                                                >
                                                    Edit Image
                                                </button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                    {/* Pagination */}
                    {(!isSearched && total > 0) && (
                        <PaginationComponent
                            currentPage={currentPage}
                            totalPages={totalPages}
                        />
                    )}
                </>
            </div>
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
            {/* Edit Image Modal */}
            {isModalOpen && singleData && (
                <EditImageDialog
                    product={singleData}
                    onClose={() => setModalOpen(false)}
                    handleDeleteImage={handleDeleteImage}
                    handleUpdateImage={handleUpdateImage}
                />
            )}
        </div>
    );
};

const Header = ({ fetchItems, searchItems }) => {
    return (
        <div className="w-full bg-gray-50 rounded py-2 px-2 mb-4 border-b">
            <div className="flex h-16 items-center px-2">
                <h1 className="text-2xl font-semibold">
                    Products
                </h1>
                <div className="ml-auto flex items-center space-x-4">
                    <Search fetchItems={fetchItems} searchItems={searchItems} />
                </div>
            </div>
        </div>
    )
}

const Page = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ProductPage />
        </Suspense>
    );
};

export default Page;