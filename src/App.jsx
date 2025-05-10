import React from 'react';
import './App.css';
import { createBrowserRouter, createHashRouter, RouterProvider } from 'react-router-dom';
import Layout from './compontent/Layout/Layout';
import Home from './compontent/Home/Home';
import Product from './compontent/product/Product';
import Cart from './compontent/cart/Cart';
import Login from './compontent/Login/Login';
import Notfound from './compontent/Notfound/Notfound';
import Register from './compontent/Register/Register';
import Logout from './compontent/Logout/Logout';
import ForgotPassword from './compontent/Forgot Password/ForgotPassword';
import Updetpasswoerd from './compontent/Updetpassword/Updetpasswoerd';
import AuthContextProvider from './Context/AuthContextProvider';
import ProtectedRoutin from './Context/ProtectedRoutin';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ProductDetails from './compontent/ProductDetails/ProductDetails';
import Categories from './compontent/Categories';
import Brands from './compontent/Brands/Brands';
import CategoryBrands from './compontent/Brands/CarigoryBrands';
import CartContextProveder from './Context/CartContextProveder';
import SippingDitals from './compontent/SippingDitals/SippingDitals';
import MywishList from './compontent/MywishList/MywishList';
import MywishListContextProveder from './Context/MywishListContextProveder/MywishListContextProveder';

export default function App() {
    let router = createHashRouter([
        {
            path: '',
            element: <Layout />,
            children: [
               
                { index: true, element: <ProtectedRoutin><Home /></ProtectedRoutin> },
                {  path: 'Product', element: <ProtectedRoutin><Product /></ProtectedRoutin> },
                { path: 'Cart', element: <ProtectedRoutin><Cart /></ProtectedRoutin> },
                { path: 'SippingDitals/:id', element: <ProtectedRoutin><SippingDitals /></ProtectedRoutin> },
                { path: 'MywishList', element: <ProtectedRoutin><MywishList/></ProtectedRoutin> },
                { path: 'ProductDetails/:id', element: <ProtectedRoutin><ProductDetails /></ProtectedRoutin> },
                { path: 'Categories', element: <ProtectedRoutin><Categories/></ProtectedRoutin> },
                { path: 'brands', element: <ProtectedRoutin><Brands/></ProtectedRoutin> },
                { path: 'CategoryBrands/:id', element: <ProtectedRoutin><CategoryBrands/></ProtectedRoutin> },
                { path: 'Login', element: <Login /> },
                { path: 'ForgotPassword', element: <ForgotPassword /> },
                { path: 'Updetpasswoerd', element: <Updetpasswoerd /> },
                { path: 'register', element: <Register /> },
                { path: 'logout', element: <Logout /> },
                { path: '*', element: <Notfound /> },
            ]
        }
    ]);

    let client = new QueryClient();

    return (
    <>

    <QueryClientProvider client={client}>
      <MywishListContextProveder>
            <AuthContextProvider>
               <CartContextProveder>
               <RouterProvider router={router} />
               </CartContextProveder>
            </AuthContextProvider>
            </MywishListContextProveder>

        </QueryClientProvider>
     
    
    </>
    );
}













