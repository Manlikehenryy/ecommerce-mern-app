import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useCartDetailContext } from "../context/CartDetailContext";

const useGetAllCartItemDetails = () => {
 
  //  const [cartItemDetails,setCartItemDetails] = useState([]);
   const [loading, setLoading] = useState(false);
   const {cartItemDetails,setCartItemDetails} = useCartDetailContext();

  useEffect(() => {
    let isMounted = true; // Flag to track if component is mounted

    const getAllCartItemsDetails = async () => {
      setLoading(true);

      try {
        const res = await fetch(`/api/cart/getAllCartItemDetails`, {
          method: "GET"
        });
        const data = await res.json();

        
        setCartItemDetails(data.data)

        if (data.error) throw new Error(data.error);
      } catch (error) {
        toast.error(error.message);
      } finally {
        if (isMounted) setLoading(false); // Update state only if component is still mounted
      }
    };

    getAllCartItemsDetails();

    return () => {
      isMounted = false; // Set flag to false when component unmounts
    };
  }, []); // Empty dependency array means this effect runs only once on component mount

  return {cartItemDetails,loading};
};

export default useGetAllCartItemDetails;
