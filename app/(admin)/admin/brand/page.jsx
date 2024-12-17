"use client";
import { clearError, clearSuccess, deleteBrand, fetchBrand, searchBrand } from "@/lib/features/brand";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useEffect } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import Search from "@/components/admin-search-bar";
import TableLoader from "@/components/loader/table-loader";
import TableEmpty from "@/components/empty-table";
import AlertSuccess from "@/components/alert-success";
import AlertFailure from "@/components/alert-failure";
import Link from "next/link";

const Page = () => {
    const dispatch = useAppDispatch();
    const { data, total, isLoading, success, error } = useAppSelector((state) => state.brand);
    
    const handleDelete = async (id) => {
        let confirm = window.confirm("Are you sure u want to delete this product?");
        if (confirm) {
            const result = await dispatch(deleteBrand(id));
            if (deleteBrand.fulfilled.match(result)) {
                dispatch(fetchBrand());
            }
        }
    }

    // Define functions to handle fetching and searching
    const fetchItems = () => {
        dispatch(fetchBrand()); // Fetch all brands
    };

    const searchItems = (query) => {
        dispatch(searchBrand(query)); // Search brands based on query
    };

    useEffect(() => {
        dispatch(fetchBrand());
    }, [dispatch])
    return (
        <div>
            <div className=" hidden flex-col md:flex  ">
                <Header fetchItems={fetchItems} searchItems={searchItems} />
                <>
                    {isLoading ? (
                        <TableLoader />
                    ) : total === 0 ? (
                        <TableEmpty />
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[100px]">#</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead>Created At</TableHead>
                                    <TableHead >Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {data.map((item, index) => (
                                    <TableRow key={item._id}>
                                        {/* Serial Number */}
                                        <TableCell className="font-medium">{index + 1}</TableCell>
                                        {/* Name */}
                                        <TableCell>{item.name}</TableCell>
                                        {/* Description */}
                                        <TableCell className="max-w-xs">{item.description}</TableCell>
                                        {/* Date */}
                                        <TableCell>{item.createdAt}</TableCell>
                                        {/* Actions */}
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <Link href={`brand/edit-brand?id=${item._id}`}
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
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
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
        </div>
    )
}

const Header = ({ fetchItems, searchItems }) => {
    return (
        <div className="w-full bg-gray-50 rounded py-2 px-2 mb-4 border-b">
            <div className="flex h-16 items-center px-2">
                <h1 className="text-2xl font-semibold">
                    Brands
                </h1>
                <div className="ml-auto flex items-center space-x-4">
                    <Search fetchItems={fetchItems} searchItems={searchItems} />
                </div>
            </div>
        </div>
    )
}

export default Page