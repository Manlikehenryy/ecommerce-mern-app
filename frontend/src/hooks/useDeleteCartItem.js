import { useState } from "react";
import toast from "react-hot-toast";
import { useCartContext } from "../context/CartContext";
import { useCartDetailContext } from "../context/CartDetailContext";


const useDeleteCartItem = () => {
	const [loading, setLoading] = useState(false);
    const {cartItems, setCartItems} = useCartContext();
	const {cartItemDetails,setCartItemDetails} = useCartDetailContext();

	const deleteCartItem = async ({cartId}) => {
		
	
		setLoading(true);
		try {
			const res = await fetch(`/api/cart/${cartId}`, {
				method: "DELETE",
				headers: { "Content-Type": "application/json" }
				// body: JSON.stringify({ productId, updatedNoOfItems }),
			});

			const data = await res.json();
			if (data.error) {
				throw new Error(data.error);
			}

			console.log(data);


            
			const updatedCartItem = data.data;

            // Find the index of the existing cartItem with the same _id
            const existingIndex = cartItems.findIndex(item => item._id === updatedCartItem._id);

            if (existingIndex !== -1) {
              // If the item exists, update it in the cartItems array
              var updatedCartItems = [...cartItems];
            //   delete updatedCartItems[existingIndex];
			  updatedCartItems = updatedCartItems.filter((item, index) => index !== existingIndex);
              setCartItems(updatedCartItems);
            } 

			const existingCartDetailsIndex = cartItemDetails.findIndex(item => item._id === updatedCartItem._id);

            if (existingCartDetailsIndex !== -1) {
              // If the item exists, update it in the cartItems array
              var updatedCartItemDetails = [...cartItemDetails];
            //   delete updatedCartItems[existingIndex];
			updatedCartItemDetails = updatedCartItemDetails.filter((item, index) => index !== existingCartDetailsIndex);
			  setCartItemDetails(updatedCartItemDetails);
            } 

			
			
			toast.success("Cart item deleted successfully");
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { loading, deleteCartItem };
};
export default useDeleteCartItem;

