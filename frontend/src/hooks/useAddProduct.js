import { useState } from "react";
import toast from "react-hot-toast";



const useAddProduct = () => {
	const [loading, setLoading] = useState(false);

    
	const addProduct = async (form) => {
		
		
		setLoading(true);
		try {
			const res = await fetch("/api/product", {
				method: "POST",
				body: form
			});

			const data = await res.json();
			if (data.error) {
				throw new Error(data.error);
			}


			toast.success("Product added successfully");
    
			
			
		} catch (error) {
			toast.error(error.message);
		} 
        finally {
			setLoading(false);
		}
	};

	return { loading, addProduct };
};
export default useAddProduct;

