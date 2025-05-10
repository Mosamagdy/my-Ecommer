import React, { useContext, useEffect, useState } from 'react';
import { Cartcontext } from '../../Context/CartContextProveder';
import { Toaster, toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';

export default function Cart() {
  const { getUrl, delUrl, setNambercart, ClierUrl, UpdetUrl } = useContext(Cartcontext);
  const [cartData, setCartData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCartData();
  }, []);

  function fetchCartData() {
    setLoading(true);
    getUrl()
      .then((req) => {
        setCartData(req.data.data);
        setNambercart(req?.data?.numOfCartItems); 
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching cart data:", error);
        setLoading(false);
      });
  }

  function DelCartData(id) {
    delUrl(id)
      .then((req) => {
        setCartData(req.data.data);
        setNambercart(req?.data?.numOfCartItems);
        toast.success("Item successfully deleted.");
      })
      .catch((error) => {
        console.error("Error deleting item:", error);
        toast.error("Failed to delete item.");
      });
  }

  function ClierCartUrl() {
    ClierUrl()
      .then((req) => {
        setCartData(req.data.data);
        setNambercart(req?.data?.numOfCartItems);
        toast.success("All items successfully deleted.");
      })
      .catch((error) => {
        console.error("Error clearing cart:", error);
        toast.error("Failed to clear cart.");
      });
  }

  function UpdetUrlCartUrl(id, count) {
    if (count > 0) {
      UpdetUrl(id, count)
        .then((req) => {
          setCartData(req.data.data);
          setNambercart(req?.data?.numOfCartItems);
          toast.success("Cart updated successfully.");
        })
        .catch((error) => {
          console.error("Error updating cart:", error);
          toast.error("Failed to update cart.");
        });
    } else {
      toast.error("Quantity cannot be zero or negative.");
    }
  }

  if (loading) {
    return (
      <div className='bg-stone-700 flex justify-center items-center h-screen'>
        <span className="loader"></span>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "#3D5A3C", color: "#FFF", padding: "20px" }}>
      <Toaster />
      {cartData?.products.length > 0 ? (
        <div className="w-11/12 mx-auto my-5">
          <h2 className="text-xl sm:text-2xl">Shop Cart</h2>
          
        
          <div className="flex flex-col sm:flex-row justify-between">
            <h2 className="text-lg sm:text-2xl my-3 text-lime-700">
              Total Cart price: {cartData?.totalCartPrice} EGP
            </h2>
            <button 
              onClick={ClierCartUrl} 
              className="border p-2 sm:p-1 text-lg sm:text-2xl border-red-700 my-2 mx-3 rounded bg-red-700"
            >
              Delete All
            </button>
          </div>
  
          <div className="divide-y-2 divide-gray-500">
            {cartData?.products?.map((item) => (
              <div key={item._id} className="flex flex-col sm:flex-row items-center py-3">
                
      
                <div className="w-full sm:w-2/12">
                  <img 
                    src={item?.product?.imageCover} 
                    className="p-2 w-full h-40 sm:h-32 md:h-64 object-contain rounded-md" 
                    alt="" 
                  />
                </div>
  
 
                <div className="w-full sm:w-10/12 text-center sm:text-left">
                  <h2 className="text-lg sm:text-2xl">{item?.product?.title}</h2>
                  <h2 className="text-green-700 text-md sm:text-2xl">
                    Price: {item.price} EGP
                  </h2>
                  
              
                  <button 
                    onClick={() => DelCartData(item?.product?._id)} 
                    className="border p-1 border-red-700 my-2 mx-3 rounded text-red-700 hover:bg-red-700 hover:text-white"
                  >
                    <i className="fa-solid fa-trash-can mr-2"></i> Remove
                  </button>
                </div>
  
           
                <div className="w-full sm:w-2/12 flex items-center justify-center sm:justify-start">
                  <i 
                    onClick={() => UpdetUrlCartUrl(item?.product?._id, item.count + 1)} 
                    className="fa-solid fa-plus cursor-pointer border border-green-700 rounded mx-1 p-2"
                  ></i>
                  <span className="mx-2 text-lg sm:text-xl">{item.count}</span>
                  <i 
                    onClick={() => UpdetUrlCartUrl(item?.product?._id, item.count - 1)} 
                    className="fa-solid fa-minus cursor-pointer border border-green-700 rounded mx-1 p-2"
                  ></i>
                </div>
  
              </div>
            ))}
          </div>
  
   
          <Link 
            to={'/SippingDitals/' + cartData._id} 
            className="text-center block text-lg sm:text-2xl text-white w-full bg-green-700 py-2 my-3"
          >
            Pay <i className="fab fa-cc-visa text-lg sm:text-2xl text-white"></i>
          </Link>
        </div>
      ) : (
        <div className="text-xl sm:text-3xl text-black font-bold text-center h-screen flex items-center justify-center">
          You have no products in the cart...
        </div>
      )}
    </div>
  );
}
