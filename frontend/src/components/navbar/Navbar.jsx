import React, { useEffect, useState } from 'react';
import { useAuthContext } from "../../context/AuthContext";
import useSignout from '../../hooks/useSignout';
import Cart from '../cart/Cart';
import { useCartContext } from '../../context/CartContext';
import useGetAllCartItems from '../../hooks/useGetAllCartItems';

const Navbar = () => {



const { authUser } = useAuthContext();


const { signout } = useSignout();
const [showCart,setShowCart] = useState(false);
const {cartItems, totalPrice, setTotalPrice} = useCartContext();
const [noOfItem,setNoOfItem] = useState(0);

const ShowCart = () =>{
    if (authUser) {
      setShowCart(true);
    }
    else{
      window.location.href = '/signin';
    }
}

useEffect(() => {
  async function fetchData() {
    await getAllCartItems();
  }
 
  if (authUser) {
    fetchData();
   }
}, [authUser]);

const {getAllCartItems} = useGetAllCartItems();

useEffect(()=>{
    // Check if cartItems is not null or undefined before processing
    if (cartItems && cartItems.length > 0) {
      let total = 0;
      let i = 0;
  
      cartItems.forEach(cartItem => {
        total += cartItem.price;
        i += cartItem.noOfItem;
      });
  
      setTotalPrice(total);
      setNoOfItem(i);
    }
  
},[cartItems])




const signOut = async () => {
    await signout();
}

  return (
   <>
   <div className="navbar bg-base-100 shadow-lg rounded-lg">
  <div className="flex-1">
    <a href='/' className="btn btn-ghost text-xl">Shoppy</a>
  </div>


  <div className="flex-none">
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
        <div className="indicator">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
          {cartItems && cartItems.length > 0 && <span className="badge badge-sm indicator-item">{noOfItem}</span>}
        </div>
      </div>
      <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow">
        <div className="card-body">
          {!cartItems ? <span className="font-bold text-lg"> Add Item to Cart </span> :
          <>
          {cartItems && cartItems.length > 0 && <span className="font-bold text-lg">{ noOfItem > 1 ? `${noOfItem} Items` : `${noOfItem} Item`} </span>}
          <span className="text-info">Subtotal: ₦{totalPrice}</span>
          <div className="card-actions">
            <button onClick={()=>ShowCart()} className="btn btn-primary btn-block">View cart</button>
          </div>
          </>}
        </div>
      </div>
    </div>
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img alt="Tailwind CSS Navbar component" src="/icons8-user-5.png" />
        </div>
      </div>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
        <li>
          <a className="justify-between">
            Profile
          </a>
        </li>
        {!authUser && <li><a href='/signup'>Sign Up</a></li>}
        {!authUser && <li><a href='/signin'>Sign In</a></li>}
        {authUser && <li><a href='/orders'>Orders</a></li>}
        {authUser && authUser.data.role === 'admin' && <li><a href='/addproduct'>Add Product</a></li>}
        {authUser && <li onClick={signOut}><a>Sign Out</a></li>}
      </ul>
    </div>
  </div>
</div>

   {showCart && <Cart showCart={showCart} setShowCart={setShowCart}/>}
   </> 
  )
}

export default Navbar