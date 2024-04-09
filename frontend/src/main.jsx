import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from "react-router-dom";
import { ProductContextProvider } from './context/ProductContext.jsx'
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { CartContextProvider } from './context/CartContext.jsx';
import { CartDetailContextProvider } from './context/CartDetailContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <ProductContextProvider>
      <AuthContextProvider>
        <CartContextProvider>
          <CartDetailContextProvider>
             <App />
          </CartDetailContextProvider>
        </CartContextProvider>
      </AuthContextProvider>
    </ProductContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
