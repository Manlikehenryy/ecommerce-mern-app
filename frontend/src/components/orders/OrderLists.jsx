import React from 'react'
import OrderSkeleton from '../skeletons/OrderSkeleton';
import useGetAllOrders from '../../hooks/useGetAllOrders';
import OrderList from './OrderList';

const OrderLists = () => {
    const {loading,orders} =  useGetAllOrders();
        
  return (
    <>
  
  <ul role="list" className="divide-y divide-gray-100 w-full">
    {!loading &&
				orders.length > 0 &&
				orders.map((order) => (
					<li  className="flex justify-between gap-x-6 py-5 bg-base-100 shadow-lg rounded-lg p-5 my-3" key={order._id}>
						<OrderList order={order} />
					</li>
				))}
</ul>

{loading && <div className='w-full flex flex-col'>
{loading && [...Array(3)].map((_, idx) => <OrderSkeleton key={idx} />)}
</div>} 
			{!loading && orders.length === 0 && (
				<h1 className='mx-auto text-lg font-semibold'>There are no orders currently</h1>
			)} 
    </>
  )
}

export default OrderLists