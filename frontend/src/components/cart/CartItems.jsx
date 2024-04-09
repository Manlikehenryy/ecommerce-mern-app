import React, { useEffect } from 'react'
import CartItem from './CartItem'
import CartItemSkeleton from '../skeletons/CartItemSkeleton'
import { useCartDetailContext } from "../../context/CartDetailContext";


const CartItems = ({loading}) => {
  const {cartItemDetails} = useCartDetailContext();


  return (
    <div className="mt-8">
    <div className="flow-root">
      <ul role="list" className="-my-6 divide-y divide-gray-200">

    {!loading && cartItemDetails &&
        cartItemDetails.length > 0 &&
        cartItemDetails.map((cartItemDetail) => (
            <li className="flex py-6" key={cartItemDetail._id}>
                <CartItem cartItemDetail = {cartItemDetail}/>
            </li>
        ))}

    {loading && [...Array(4)].map((_, idx) => <CartItemSkeleton key={idx} />)}
	{!loading && cartItemDetails.length === 0 && (
				<h1 className='mx-auto text-lg font-semibold mt-20 text-center'>Add items to your cart</h1>
	)} 
   
   </ul>
    </div>
  </div>
    
  )
}

export default CartItems