"use client"
import OrderCardComponent from "@/components/order-card-component";
import { cancelOrder, clearSuccess, fetchUserOrders, clearError } from "@/lib/features/order";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import AlertSuccess from "@/components/alert-success";
import AlertFailure from "@/components/alert-failure";
import OrderCardLoader from "@/components/loader/orderCardLoader";

const OrderPage = () => {
  const { data: session } = useSession();
  const userId = session.user.id
  const dispatch = useAppDispatch();
  const { data: orders, error, isLoading, success } = useAppSelector((state) => state.order);
  useEffect(() => {
    dispatch(fetchUserOrders(userId));
  }, [dispatch])

  const handleCancelOrder = async (id) => {
    let confirm = window.confirm("Do you want to cancel this order?");
    if (confirm) {
      const result = await dispatch(cancelOrder(id));;
      if (cancelOrder.fulfilled.match(result)) {
        dispatch(fetchUserOrders(userId));
      }
    }
  }


  return (

    <section className="mx-auto max-w-screen-xl px-2 2xl:px-0 mt-2">
      <div className="w-full">
        <div className="sm:flex sm:items-center sm:justify-between">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl mb-2">
            My orders
          </h2>
        </div>
        <div className="flow-root">
          <div className="flow-root">
            <div className=" flow-root ">
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {isLoading ? (
                  <>
                    <OrderCardLoader />
                    <OrderCardLoader />
                    <OrderCardLoader />
                    <OrderCardLoader />
                  </>

                ) : orders.length === 0 ? (
                  <div>No Orders Found</div>
                ) : (
                  orders.map((order, index) => (
                    <OrderCardComponent
                      order={order}
                      key={index}
                      handleCancelOrder={handleCancelOrder}
                    />
                  ))
                )}



              </div>
            </div>
          </div>
        </div>
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
    </section>


  )
}

export default OrderPage