
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import SimpleSlider from '../../SimpleSlider/SimpleSlider';
import { Cartcontext } from '../../Context/CartContextProveder';
import { MyWishlistContext } from '../../Context/MywishListContextProveder/MywishListContextProveder';
import CategorySlider from '../Categories';
import img from '../../assets/images/bb.jpg'
import ims from '../../assets/images/411.jpg'; 
import Foter from '../Foter/Foter'


const fetchProducts = async () => {
  const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  return response.data.data; 
};

export default function Home() {
  const { PostUrl, setNambercart } = useContext(Cartcontext);
  const { postUrll, getUrl, deleteUrl } = useContext(MyWishlistContext);
  const [wishlistIds, setWishlistIds] = useState([]);

  useEffect(() => {
    getUrl()
      .then((res) => {
        setWishlistIds(res.data.data.map((item) => item._id));
      })
      .catch((err) => console.error("Error fetching wishlist:", err));
  }, [getUrl]);


  const { data: productList, isLoading, isError, error } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    staleTime: 1000 * 60 * 5, 
  });


  const toggleWishlist = async (productId, e) => {
    e.preventDefault();
    try {
      if (!wishlistIds.includes(productId)) {
        await postUrll(productId);
        setWishlistIds([...wishlistIds, productId]);
        toast.success("Added to wishlist");
      } else {
        await deleteUrl(productId);
        setWishlistIds(wishlistIds.filter((id) => id !== productId));
        toast.success("Removed from wishlist");
      }
    } catch {
      toast.error("Failed to update wishlist");
    }
  };

  if (isLoading) {
    return (
      <div className='bg-stone-700 flex justify-center items-center h-screen'>
        <span className="loader"></span>
      </div>
    );
  }
  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen w-screen bg-black">
      <img src={ims} alt="Error Page" className="h-full w-full object-contain" />
    </div>
    );
  }

  return (
    <div style={{ backgroundColor: "#FFFFFF" }}>
        
      <Toaster />
      <div className='w-11/12 mx-auto p-2'>
      <CategorySlider />
      <img src={img}  className="w-full" />
        <div className='flex flex-wrap'>
          {productList.slice(-20).map((product, index) => (
            <div key={product._id} className='lg:w-3/12 md:w-4/12 sm:w-6/12 w-full p-2 mb-4'>
              <div className='item p-1 group overflow-hidden hover:shadow-lg hover:shadow-green-600 relative'>
                <Link to={`/ProductDetails/${product._id}`} className="relative block">
                  <div className="overflow-hidden relative">
                    {index % 2 === 0 && (
                      <div className="absolute z-50 top-5 left-0 bg-red-500 text-white text-xl font-bold px-5 py-1 rounded transform -rotate-45">
                        Sale
                      </div>
                    )}
                    {index % 2 !== 0 && (
                      <div className="absolute z-50 top-5 left-0 bg-amber-500 text-white text-xl font-bold px-2 py-1 rounded transform -rotate-45">
                        New!
                      </div>
                    )}
                    <div className="relative overflow-hidden group">
                      <img
                        src={product.imageCover}
                        alt={product.title || 'Product'}
                        className="w-full filter grayscale transition-all duration-500 ease-in-out group-hover:filter-none group-hover:scale-110"
                      />
                    </div>  
                          
                       </div>
                  <h5 className='text-green-700'>{product.category?.name || 'Unknown Category'}</h5>
                  <h2>{product.title?.split(" ").slice(0, 2).join(" ") || 'No Title'}</h2>
                </Link>

                <button onClick={(e) => toggleWishlist(product._id, e)} className="ml-2">
                  <i className={`fa-solid fa-heart text-3xl ${wishlistIds.includes(product._id) ? "text-red-500" : "text-gray-400"}`}></i>
                </button>

                {/* <button onClick={() => addCart(product._id)} className='bg w-full border-r rounded py-1 transition-transform duration-500 transform translate-y-10 group-hover:translate-y-0'>
                  Add to cart
                </button> */}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Foter/>
    </div>
  );
}


