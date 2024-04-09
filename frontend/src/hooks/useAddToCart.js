import { useState } from "react";
import toast from "react-hot-toast";
import { useCartContext } from "../context/CartContext";


const useAddToCart = () => {
	const [loading, setLoading] = useState(false);
    const {cartItems, setCartItems} = useCartContext();

	const addToCart = async ({productId, updatedNoOfItems}) => {
		
	
		setLoading(true);
		try {
			const res = await fetch("/api/cart", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ productId, updatedNoOfItems }),
			});

			const data = await res.json();
			if (data.error) {
				throw new Error(data.error);
			}



            
			const updatedCartItem = data.data;

            // Find the index of the existing cartItem with the same _id
            const existingIndex = cartItems.findIndex(item => item._id === updatedCartItem._id);

            if (existingIndex !== -1) {
              // If the item exists, update it in the cartItems array
              const updatedCartItems = [...cartItems];
              updatedCartItems[existingIndex] = updatedCartItem;
			  console.log(updatedCartItems);
              setCartItems(updatedCartItems);
            } else {
              // If the item doesn't exist, add it to the beginning of the cartItems array
              setCartItems([updatedCartItem, ...cartItems]);
            }

			
			
			toast.success("Cart updated successfully");
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { loading, addToCart };
};
export default useAddToCart;

