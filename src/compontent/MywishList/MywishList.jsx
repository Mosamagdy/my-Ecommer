
import React, { useContext, useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { MyWishlistContext } from "../../Context/MywishListContextProveder/MywishListContextProveder";
import { Cartcontext } from "../../Context/CartContextProveder";

export default function MyWishlist() {
  const { getUrl, deleteUrl, clearUrl } = useContext(MyWishlistContext);
  const { PostUrl, setNambercart } = useContext(Cartcontext);
  
  const [loading, setLoading] = useState(true);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [activeItems, setActiveItems] = useState({});

  useEffect(() => {
    fetchWishlistData();
  }, []);

  function fetchWishlistData() {
    setLoading(true);
    getUrl()
      .then((res) => {
        setWishlistItems(res.data.data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }

  function handleDelete(id) {
    deleteUrl(id)
      .then(() => {
        toast.success("Item successfully deleted.");
        setWishlistItems((prevItems) => prevItems.filter((item) => item._id !== id));
        setActiveItems((prevState) => ({ ...prevState, [id]: true }));
      })
      .catch(() => toast.error("Failed to delete item."));
  }



  const addCart = async (id) => {
    try {
      const res = await PostUrl(id);
      setNambercart(res.data.numOfCartItems);
      toast.success("Item added to cart successfully!");
    } catch (error) {
      toast.error("Failed to add item to cart");
    }
  };

  if (loading) {
    return (
      <div className='bg-stone-700 flex justify-center items-center h-screen'>
        <span className="loader"></span>
      </div>
    );
  }

  return (
    <>
      <Toaster />
      {wishlistItems.length > 0 ? (
        <div style={{ backgroundColor: "#3D5A3C", color: "#FFF", padding: "20px" }}>
          <h2 className='text-2xl'>My Wishlist</h2>

      
          <div className='divide-y-2 divide-gray-500'>
          {wishlistItems.map((item) => (
          <div key={item._id} className="flex flex-col sm:flex-row items-center py-3 overflow-x-hidden">
            
          
            <div className="w-full py-4 sm:w-2/12 max-w-full sm:max-w-xs">
              <img 
                src={item.imageCover} 
                className="p-2 w-full h-40 sm:h-32 md:h-64 lg:h-80 xl:h-96 object-contain rounded-md" 
                alt={item.title} 
              />
            </div>

            <div className="w-full p-10 sm:w-10/12 text-center sm:text-left flex flex-col">
              <h2 className="text-lg sm:text-xl font-bold">{item.title}</h2>
              <h2 className="text-green-700 text-md sm:text-lg">Price: {item.price} EGP</h2>

     
              <button 
                onClick={() => handleDelete(item._id)} 
                className="border-none bg-transparent p-2 text-left text-red-500 text-2xl sm:text-3xl mt-2"
              >
                <i className="fa-solid fa-heart"></i>
              </button>

        
              <button 
                onClick={() => addCart(item._id)} 
                className="bg-green-500 text-white w-full py-2 mt-3 rounded-lg hover:bg-green-700 transition-all"
              >
                Add to cart
              </button>
            </div>
          </div>
        ))}
          </div>
        </div>
      ) : (
        <div className='bg-stone-700 flex justify-center items-center h-screen'>
          <span className="text-white text-2xl">Your wishlist is empty.</span>
        </div>
      )}
    </>
  );
}