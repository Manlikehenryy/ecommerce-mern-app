
import './App.css'
import { useEffect } from 'react';
import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import SignUp from './pages/signup/SignUp'
import SignIn from './pages/signin/SignIn'
import Home from './pages/home/Home'
import { useAuthContext } from "./context/AuthContext";
import Navbar from './components/navbar/Navbar';
import Cookies from 'js-cookie';
import useHasTokenExpired from './hooks/useHasTokenExpired';
import useGetAllOrders from './hooks/useGetAllOrders';
import Orders from './pages/order/Orders';
import AddProduct from './pages/product/AddProduct';

function App() {
  const { authUser } = useAuthContext();


  useEffect(() => {
    async function isTokenExpired() {
      await hasTokenExpired();
    }
   
    if (authUser) {
      isTokenExpired();
     }
  }, [authUser]);
  
  const {hasTokenExpired} = useHasTokenExpired();

  return (



    <div className='px-5 py-3 h-screen'>
      <Navbar/>
			<Routes>
    	<Route path='/' element={<Home />} />
      <Route path='/addproduct' element={authUser && authUser.data.role === 'admin' ? <AddProduct /> : <SignIn />} />
      <Route path='/orders' element={authUser ? <Orders /> : <SignIn />} />
      <Route path='/signin' element={authUser ? <Navigate to='/' /> : <SignIn />} />
      <Route path='/signup' element={authUser ? <Navigate to='/' /> : <SignUp />} />
			</Routes>
			<Toaster />
		</div>
  )
}

export default App
