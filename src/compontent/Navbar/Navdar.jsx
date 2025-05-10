import React, { useState, useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import logo from '../../assets/images/freshcart-logo.svg';
import { AuthContext } from '../../Context/AuthContextProvider';
import { Cartcontext } from '../../Context/CartContextProveder';

export default function Navbar() {
  const { token, setToken } = useContext(AuthContext);
  const { Nambercart } = useContext(Cartcontext);
  const nav = useNavigate();


  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  function Logout() {
    localStorage.removeItem('token');
    setToken(null);
    nav('/Login');
  }

  return (
    <nav className="bg-[#F3F2F2] border-gray-200 dark:bg-gray-800">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">

    
        <div className="flex items-center">
          <Link to="/">
            <img src={logo} className="h-10" alt="Logo" />
          </Link>
        </div>

    
        <div className="hidden sm:flex flex-grow justify-center">
          {token && (
            <ul className="flex space-x-6 text-center">
              <li><NavLink to="/Product" className="text-lg font-bold">Home</NavLink></li>
              <li><NavLink to="/" className="text-lg font-bold">Products</NavLink></li>
              <li><NavLink to="/brands" className="text-lg font-bold">Brands</NavLink></li>
              <li><NavLink to="/Cart" className="text-lg font-bold">Cart</NavLink></li>
              <li><NavLink to="/MywishList" className="text-lg font-bold">My Wishlist</NavLink></li>
            </ul>
          )}
        </div>


        <button 
          className="text-2xl sm:hidden focus:outline-none"
          onClick={toggleMenu}
        >
          <i className="fa-solid fa-bars"></i>
        </button>

   
        <div className="flex items-center space-x-4">

          {token && (
            <div className="relative">
              <i className="fa-solid fa-cart-shopping text-lime-600 text-xl"></i>
              <span className="absolute top-[-20px] right-[-3px] text-lime-600 text-lg rounded-full px-2">{Nambercart}</span>
            </div>
          )}


          <div className="hidden sm:flex space-x-2 text-lg">
          <a href="http://www.linkedin.com/in/mosa-elwayly-52807029b" target="_blank">
           <i className="fab fa-linkedin-in p-1"></i> </a>
          <a href="https://www.facebook.com"><i className="fab p-1 fa-facebook-f"></i></a>
          <a href="https://www.instagram.com"><i className="fab p-1 fa-instagram"></i></a>
          <a href="mailto:mosaelwayly@gmail.com"><i className="fas p-1 fa-envelope"></i></a>
          </div>


          {token ? (
            <button onClick={Logout} className="text-lg font-bold">Logout</button>
          ) : (
            <div className="flex space-x-4">
              <NavLink to="/Login" className="text-lg font-bold">Login</NavLink>
              <NavLink to="/Register" className="text-lg font-bold">Register</NavLink>
            </div>
          )}
        </div>
      </div>


      <div className={`w-full bg-gray-200 p-4 transition-all duration-300 ${isMenuOpen ? "block" : "hidden"} sm:hidden`}>
        {token && (
          <ul className="flex flex-col space-y-2 text-center">
            <li><NavLink to="/Product" className="text-lg font-bold">Home</NavLink></li>
            <li><NavLink to="/" className="text-lg font-bold">Products</NavLink></li>
            <li><NavLink to="/brands" className="text-lg font-bold">Brands</NavLink></li>
            <li><NavLink to="/Cart" className="text-lg font-bold">Cart</NavLink></li>
            <li><NavLink to="/MywishList" className="text-lg font-bold">My Wishlist</NavLink></li>
          </ul>
        )}
      </div>
    </nav>
  );
}