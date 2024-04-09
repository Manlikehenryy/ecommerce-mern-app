import { useState } from "react";
import toast from "react-hot-toast";
import { useCartContext } from "../context/CartContext";
import { useCartDetailContext } from "../context/CartDetailContext";


const useAddOrder = () => {
	const [loadingOrder, setLoadingOrder] = useState(false);
    const {cartItems,setCartItems,setTotalPrice} = useCartContext();
    const {setCartItemDetails} = useCartDetailContext();
    
	const addOrder = async (transactionReference) => {
		
		setLoadingOrder(true);
		try {
			const res = await fetch("/api/order", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({cartItems: cartItems, transactionReference: transactionReference }),
			});

			const data = await res.json();
			if (data.error) {
				throw new Error(data.error);
			}



            
			setCartItems([]);
            setCartItemDetails([]);
            setTotalPrice(0);
			
			
		} catch (error) {
			toast.error(error.message);
		} 
        finally {
			setLoadingOrder(false);
		}
	};

	return { loadingOrder, addOrder };
};
export default useAddOrder;

