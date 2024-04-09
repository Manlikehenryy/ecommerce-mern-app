import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useProductContext } from "../context/ProductContext";

const useGetAllProducts = () => {
  const [loading, setLoading] = useState(false);
  const { setProducts, products } = useProductContext();

  useEffect(() => {
    let isMounted = true; // Flag to track if component is mounted

    const getProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/product`, {
          method: "GET"
        });
        const data = await res.json();

        // console.log(data);
        setProducts(data.data)
        // products = data.data
        if (data.error) throw new Error(data.error);
      } catch (error) {
        toast.error(error.message);
      } finally {
        if (isMounted) setLoading(false); // Update state only if component is still mounted
      }
    };

    getProducts();

    return () => {
      isMounted = false; // Set flag to false when component unmounts
    };
  }, []); // Empty dependency array means this effect runs only once on component mount

  return { loading , products};
};

export default useGetAllProducts;
