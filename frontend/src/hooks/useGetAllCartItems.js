import { useEffect } from "react";
import toast from "react-hot-toast";
import { useCartContext } from "../context/CartContext";

const useGetAllCartItems = () => {
 
  const {setCartItems} = useCartContext();



    const getAllCartItems = async () => {
      try {
        const res = await fetch(`/api/cart`, {
          method: "GET"
        });
        const data = await res.json();

        setCartItems(data.data)

        if (data.error) throw new Error(data.error);
      } catch (error) {
        toast.error(error.message);
      } 
    };

    


  return {getAllCartItems};
};

export default useGetAllCartItems;
