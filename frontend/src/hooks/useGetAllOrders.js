import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const useGetAllOrders = () => {
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    let isMounted = true; // Flag to track if component is mounted

    const getAllOrders = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/order`, {
          method: "GET"
        });
        const data = await res.json();

        setOrders(data.data);

        if (data.error) throw new Error(data.error);
      } catch (error) {
        toast.error(error.message);
      } finally {
        if (isMounted) setLoading(false); // Update state only if component is still mounted
      }
    };

    getAllOrders();

    return () => {
      isMounted = false; // Set flag to false when component unmounts
    };
  }, []); // Empty dependency array means this effect runs only once on component mount

  return { loading , orders};
};

export default useGetAllOrders;

