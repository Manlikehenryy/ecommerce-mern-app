import React from 'react'


const OrderList = ({order}) => {

  const date = new Date(order.createdAt);

const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    
  return (
       <>
        <div className="flex min-w-0 gap-x-4">
          <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={order.cartId.productId.filePath} alt="" />
          <div className="min-w-0 flex-auto">
            <p className="text-sm font-semibold leading-6 text-gray-900">{order.cartId.productId.name}</p>
            <p className="mt-1 truncate text-xs leading-5 text-gray-500">{`${order.cartId.noOfItem} ₦${order.cartId.price}`}</p>
          </div>
        </div>
        <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
          <p className="text-sm leading-6 text-gray-900">{order.status}</p>
        
            <p className="mt-1 text-xs leading-5 text-gray-500">
               <time dateTime={order.createdAt}>{formattedDate}</time>
            </p>
          
        </div>
        </>
  )
}

export default OrderList