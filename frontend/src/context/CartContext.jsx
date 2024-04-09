import { createContext, useContext, useState } from "react";

export const CartContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useCartContext = () => {
	return useContext(CartContext);
};

export const CartContextProvider = ({ children }) => {
	const [cartItems, setCartItems] = useState([]);
	const [totalPrice, setTotalPrice] = useState(0);

	return <CartContext.Provider value={{ cartItems, setCartItems,totalPrice, setTotalPrice}}>{children}</CartContext.Provider>;
};
