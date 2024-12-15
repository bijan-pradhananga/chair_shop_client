"use client";

import { fetchCategory } from "@/lib/features/category";
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
import { Search } from "@/components/admin-search-bar";

const Product = () => {
    const dispatch = useAppDispatch();
    const categories = useAppSelector((state) => state.category);
    console.log(categories);

    useEffect(() => {
        dispatch(fetchCategory());
    }, [dispatch])
    return (
        <div>
            <div className="hidden flex-col md:flex">
                <div className="border-b">
                    <div className="flex h-16 items-center px-2">
                        <h1 className="text-2xl font-semibold">
                            Categories
                        </h1>
                        <div className="ml-auto flex items-center space-x-4">
                            <Search />
                        </div>
                    </div>
                </div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Invoice</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Method</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell className="font-medium">INV001</TableCell>
                            <TableCell>Paid</TableCell>
                            <TableCell>Credit Card</TableCell>
                            <TableCell className="text-right">$250.00</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default Product