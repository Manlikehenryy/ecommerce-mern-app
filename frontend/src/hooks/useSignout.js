import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import { useCartContext } from "../context/CartContext";
import { useCartDetailContext } from "../context/CartDetailContext";

const useSignout = () => {
	const { setAuthUser } = useAuthContext();
	const {setCartItems,setTotalPrice} = useCartContext();
    const {setCartItemDetails} = useCartDetailContext();

	const signout = async () => {
		
		try {
			const res = await fetch("/api/auth/signout", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
			});
			const data = await res.json();
			if (data.error) {
				throw new Error(data.error);
			}

			localStorage.removeItem("ecomm-user");
			
			setAuthUser(null);
			setCartItems([]);
            setCartItemDetails([]);
            setTotalPrice(0);
			
			toast.success("Signed out successfully")
		} catch (error) {
			toast.error(error.message);
		} 
	};

	return { signout };
};
export default useSignout;
