"use client"
import { cancelOrder, clearSuccess, clearError, fetchOrders, confirmOrder, searchOrders, clearSearch } from "@/lib/features/order";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Suspense, useEffect } from "react";
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
import OrderPaginationComponent from "@/components/order-pages";
import { useSearchParams } from "next/navigation";

const OrderPage = () => {


  const dispatch = useAppDispatch();
  const { data, isLoading, success, error, total, totalPages, isSearched } = useAppSelector((state) => state.order);
  const searchParams = useSearchParams();
  let currentPage = 1;
  if (searchParams.get('page')) {
    currentPage = Number(searchParams.get('page'))
  }
  const handleCancelOrder = async (id) => {
    let confirm = window.confirm("Do you want to cancel this order?");
    if (confirm) {
      const result = await dispatch(cancelOrder(id));;
      if (cancelOrder.fulfilled.match(result)) {
        dispatch(fetchOrders({ page: currentPage, limit: 10 }));
      }
    }
  }

  const handleConfirmOrder = async (id) => {
    let confirm = window.confirm("Do you want to confirm this order?");
    if (confirm) {
      const result = await dispatch(confirmOrder(id));;
      if (confirmOrder.fulfilled.match(result)) {
        dispatch(fetchOrders({ page: currentPage, limit: 10 }));
      }
    }
  }


  const fetchItems = () => {
    dispatch(clearSearch());
    dispatch(fetchOrders({ page: currentPage, limit: 10 }));
  }

  const searchItems = (query) => {
    dispatch(searchOrders(query));
  };

  useEffect(() => {
    dispatch(fetchOrders({ page: currentPage, limit: 10 }));
  }, [dispatch, currentPage])

  return (

    <div>
      <div className=" hidden flex-col md:flex  ">
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
                  <TableHead className="w-[100px]">ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Total Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead >Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((item, index) => (
                  <TableRow key={index}>
                    {/* Serial Number */}
                    <TableCell className="font-medium">{item._id}</TableCell>
                    {/* Name */}
                    <TableCell>{new Date(item.createdAt).toLocaleDateString("en-CA").replace(/-/g, ".")}</TableCell>
                    {/* Description */}
                    <TableCell className="max-w-xs">{item.totalAmount}</TableCell>
                    {/* Date */}
                    <TableCell>{item.status}</TableCell>
                    {/* Actions */}
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {item.status === 'Pending' ? (
                          <>
                            <button
                              onClick={() => handleConfirmOrder(item._id)}
                              className="px-2 py-1 text-sm font-medium text-white bg-green-500 rounded hover:bg-green-600"
                            >
                              Confirm
                            </button>
                            <button
                              onClick={() => handleCancelOrder(item._id)}
                              className="px-2 py-1 text-sm font-medium text-white bg-red-500 rounded hover:bg-red-600"
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <p className="text-gray-500">No further actions available</p>
                        )}

                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
          {/* Pagination */}
          {(!isSearched && total > 0) && (
            <OrderPaginationComponent
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
    </div>


  )
}



const Header = ({ fetchItems, searchItems }) => {
  return (
    <div className="w-full bg-gray-50 rounded py-2 px-2 mb-4 border-b">
      <div className="flex h-16 items-center px-2">
        <h1 className="text-2xl font-semibold">
          Orders
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
            <OrderPage />
        </Suspense>
    );
};
export default Page