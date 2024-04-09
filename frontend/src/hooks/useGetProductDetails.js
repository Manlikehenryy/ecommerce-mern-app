import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetProductDetails = () => {
 
   const [loading, setLoading] = useState(false);
   const [productDetail, setProductDetail] = useState({});

  useEffect(() => {
    let isMounted = true; // Flag to track if component is mounted

    const getProductDetails = async () => {
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

    getProductDetails();

    return () => {
      isMounted = false; // Set flag to false when component unmounts
    };
  }, []); // Empty dependency array means this effect runs only once on component mount

  return {cartItemDetails,loading};
};

export default useGetProductDetails;
