import { createContext, useContext, useState } from "react";

export const CartDetailContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useCartDetailContext = () => {
	return useContext(CartDetailContext);
};

export const CartDetailContextProvider = ({ children }) => {
	const [cartItemDetails, setCartItemDetails] = useState([]);

	return <CartDetailContext.Provider value={{ cartItemDetails, setCartItemDetails}}>{children}</CartDetailContext.Provider>;
};
