import React, { useState } from 'react'
import useDeleteCartItem from '../../hooks/useDeleteCartItem';
import useAddToCart from '../../hooks/useAddToCart';

import { useAuthContext } from '../../context/AuthContext';

const CartItem = ({cartItemDetail}) => {
  const {addToCart} = useAddToCart();
  const {loading,deleteCartItem} = useDeleteCartItem();

  const { authUser } = useAuthContext();
  const [noOfItem, setNoOfItem] = useState(cartItemDetail.noOfItem);

  const addItemToCart = async (productId, updatedNoOfItems) =>{
    if (authUser) {
      await addToCart({productId: productId, updatedNoOfItems: updatedNoOfItems});
      setNoOfItem(updatedNoOfItems);
    }
    else{
      window.location.href = '/signin';
    }
}

const removeCartItem = async (cartId) =>{
  if (authUser) {
    await deleteCartItem({cartId: cartId});
  }
  else{
    window.location.href = '/signin';
  }
}

  return (
    
        
           <>
            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
              <img
                src={cartItemDetail.productId.filePath}
                alt={cartItemDetail.productId.name}
                className="h-full w-full object-cover object-center"
              />
            </div>

            <div className="ml-4 flex flex-1 flex-col">
              <div>
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <h3>
                    <a href="#">{cartItemDetail.productId.name}</a>
                  </h3>
                  <p className="ml-4">₦{noOfItem * cartItemDetail.productId.price}</p>
                </div>
                {/* <p className="mt-1 text-sm text-gray-500">{product.color}</p> */}
              </div>
              <div className="flex flex-1 items-end justify-between text-sm">
                {/* <p className="text-gray-500">Qty {product.quantity}</p> */}
                <select value={noOfItem} onChange={(e)=>{addItemToCart(cartItemDetail.productId._id,e.target.value)}} className="w-12 h-8 border border-gray-400 rounded-md select-bordered ">
                   <option  value={1}>1</option>
                   <option value={2}>2</option>
                   <option value={3}>3</option>
                   <option  value={4}>4</option>
                   <option value={5}>5</option>
                   <option value={6}>6</option>
                   <option  value={7}>7</option>
                   <option value={8}>8</option>
                   <option value={9}>9</option>
                   <option value={10}>10</option>
                </select>

                <div className="flex">
                  <button
                    type="button"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                    onClick={()=> removeCartItem(cartItemDetail._id)}
                  >
                    {loading ? <span className='loading loading-spinner'></span> : "Remove"}
                  </button>
                </div>
              </div>
            </div>
       
           </>
    


     
  )
}

export default CartItem