
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import SimpleSlider from '../../SimpleSlider/SimpleSlider';
import { Cartcontext } from '../../Context/CartContextProveder';
import { MyWishlistContext } from '../../Context/MywishListContextProveder/MywishListContextProveder';
import ims from '../../assets/images/411.jpg'; 
import Foter from '../Foter/Foter'

const fetchProducts = async ({ queryKey }) => {
  const [_, page] = queryKey;
  const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/products?limit=40&page=${page}`);
  return response.data;
};

export default function Product() {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState(""); 
  const [query, setQuery] = useState("");
  const [showCategories, setShowCategories] = useState(false);


  const { PostUrl, setNambercart } = useContext(Cartcontext);
  const { postUrll, getUrl, deleteUrl } = useContext(MyWishlistContext);
  const [wishlistIds, setWishlistIds] = useState([]);
  

  useEffect(() => {
    getUrl()
      .then((res) => {
        const wishlistItems = res.data.data;
        setWishlistIds(wishlistItems.map((item) => item._id));
      })
      .catch((err) => console.error("Error fetching wishlist:", err));
  }, [getUrl]);

  const { data, isLoading, isFetching, isError, error } = useQuery({
    queryKey: ['Brands', page],
    queryFn: fetchProducts,
    keepPreviousData: true,
  });

  const productList = data?.data || [];
  const numberOfPages = data?.metadata?.numberOfPages || 1;
  
  
  const filteredProducts = productList.filter(product =>
    product.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= numberOfPages) {
      setPage(newPage);
    }
  };

  const addCart = async (id) => {
    try {
      const res = await PostUrl(id);
      setNambercart(res.data.numOfCartItems);
      toast.success(res.data.message);
    } catch (error) {
      console.error('Error adding to cart:', error.response ? error.response.data : error.message);
      toast.error("Failed to add to cart");
    }
  };

  const toggleWishlist = async (productId, e) => {
    e.preventDefault();
    if (!wishlistIds.includes(productId)) {
      try {
        await postUrll(productId);
        setWishlistIds(prev => [...prev, productId]);
        toast.success("Added to wishlist");
      } catch (err) {
        console.error("Error adding to wishlist:", err);
        toast.error("Failed to add to wishlist");
      }
    } else {
      try {
        await deleteUrl(productId);
        setWishlistIds(prev => prev.filter(id => id !== productId));
        toast.success("Removed from wishlist");
      } catch (err) {
        console.error("Error removing from wishlist:", err);
        toast.error("Failed to remove from wishlist");
      }
    }
  };

  if (isLoading || isFetching) {
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

        <div className='my-5'>
          <SimpleSlider />
     
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-2 sm:gap-4 p-4">
  
  <div className="relative w-full md:w-1/2 flex-1">
    <input
      type="text"
      placeholder="Search here..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="p-2 w-full border border-gray-300 bg-[#F3F2F2] rounded pl-10 focus:ring-2 focus:ring-lime-500"
    />
    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
      <i className="fas fa-search"></i>
    </div>
  </div>

  
  <div className="relative">
    <button
      className="p-2 border border-gray-300 bg-[#F3F2F2] rounded flex items-center gap-2 hover:bg-gray-300"
      onClick={() => setShowCategories(!showCategories)}
    >
      <span className=" font-bold">Category</span>
      <i className={`fas fa-chevron-${showCategories ? "up" : "down"}`}></i>
    </button>
    {showCategories && (
      <ul className="absolute z-50 mt-2 bg-white border border-gray-300 rounded w-full p-2 shadow-md transition-all duration-300">
        {["Sofa", "Table", "Bed", "Wardrobe"].map((category, index) => (
          <li
            key={index}
            className="p-2 hover:bg-gray-100 cursor-pointer"
            onClick={() => {
              setSearchTerm(category);
              setShowCategories(false);
            }}
          >
            {category}
          </li>
        ))}
      </ul>
    )}
  </div>
</div>
        
        </div>
        <div className="p-4 text-center">
  <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6  justify-center">
    {/* بوكس 1 - ثلاجة */}
    <div className="w-32 h-20 bg-[#F3F2F2] rounded-lg shadow-md flex items-center justify-center p-2">
      <div className="bg-white p-2 rounded">
        <i className="fas fa-snowflake text-xl text-blue-500"></i>
      </div>
      <p className="ml-2 text-sm font-bold">Refrigerator</p>
    </div>

    {/* بوكس 2 - أنتريه */}
    <div className="w-32 h-20 bg-[#F3F2F2] rounded-lg shadow-md flex items-center justify-center p-2">
      <div className="bg-white p-2 rounded">
        <i className="fas fa-couch text-xl text-brown-500"></i>
      </div>
      <p className="ml-2 text-sm font-bold">Sofa</p>
    </div>

    {/* بوكس 3 - سخان */}
    <div className="w-32 h-20 bg-[#F3F2F2] rounded-lg shadow-md flex items-center justify-center p-2">
      <div className="bg-white p-2 rounded">
        <i className="fas fa-fire text-xl text-red-500"></i>
      </div>
      <p className="ml-2 text-sm font-bold">Water Heater</p>
    </div>

    {/* بوكس 4 - غسالة */}
    <div className="w-32 h-20 bg-[#F3F2F2] rounded-lg shadow-md flex items-center justify-center p-2">
      <div className="bg-white p-2 rounded">
        <i className="fas fa-tshirt text-xl text-green-500"></i>
      </div>
      <p className="ml-2 text-sm font-bold">Washing Machine</p>
    </div>

    {/* بوكس 5 - تلفزيون */}
    <div className="w-32 h-20 bg-[#F3F2F2] rounded-lg shadow-md flex items-center justify-center p-2">
      <div className="bg-white p-2 rounded">
        <i className="fas fa-tv text-xl text-gray-700"></i>
      </div>
      <p className="ml-2 text-sm font-bold">Television</p>
    </div>

    {/* بوكس 6 - ميكروويف */}
    <div className="w-32 h-20 bg-[#F3F2F2] rounded-lg shadow-md flex items-center justify-center p-2">
      <div className="bg-white p-2 rounded">
        <i className="fas fa-utensils text-xl text-orange-500"></i>
      </div>
      <p className="ml-2 text-sm font-bold">Microwave</p>
    </div>
  </div>
</div>
        
        <div className='flex flex-wrap'>
{filteredProducts.map((product, index) => (
  <div key={product._id} className='lg:w-3/12 md:w-4/12 sm:w-6/12 w-full p-2 mb-4'>
    <div className='item p-1 group overflow-hidden hover:shadow-lg hover:shadow-green-600'>
      <Link to={`/ProductDetails/${product._id}`} className="relative">
        
      <div className="relative">

  <div className="absolute top-0 left-0 w-full flex justify-between p-2 text-black">


    <span className="bg-lime-600 z-10">
      {product.price} EGP
    </span>
    
 
    <span className="z-10">
      <i className="fa-solid fa-star text-yellow-300"></i> {product.ratingsAverage}
    </span>
  </div>
  <div className="overflow-hidden">
    <img 
      src={product.imageCover} 
      alt={product.title || 'Product'} 
      className="w-full transition-transform duration-500 ease-in-out group-hover:transform group-hover:rotate-[360deg]"
    />
  </div>
</div>
            

        <h5 className='text-green-700'>{product.category?.name || 'Unknown Category'}</h5>
        <h2>{product.title?.split(" ").slice(0, 2).join(" ") || 'No Title'}</h2>
      </Link>

    
      <button onClick={(e) => toggleWishlist(product._id, e)} className="ml-2">
        <i className={`fa-solid fa-heart text-3xl ${wishlistIds.includes(product._id) ? "text-red-500" : "text-gray-400"}`}></i>
      </button>

    
      <button onClick={() => addCart(product._id)} className='bg w-full border-r rounded py-1 transition-transform duration-500 transform translate-y-10 group-hover:translate-y-0'>
        Add to cart
      </button>
    </div>
  </div>
))}
        </div>

        <nav aria-label="Page navigation example">
          <ul className="flex items-center justify-center my-3 space-x-2 h-8 text-sm">
            <li>
              <button 
                onClick={() => handlePageChange(page - 1)} 
                disabled={page === 1} 
                aria-label="Previous Page" 
                className="px-3 py-2 border border-gray-300 rounded bg-gray-100 hover:bg-gray-200 disabled:bg-gray-300"
              >
                <i className="fas fa-arrow-left"></i>
              </button>
            </li>

            {[...Array(numberOfPages)].map((_, i) => (
              <li key={i + 1}>
                <button 
                  onClick={() => handlePageChange(i + 1)} 
                  className={`px-4 py-2 border border-gray-300 rounded ${
                    page === i + 1 
                      ? 'bg-blue-500 text-white font-bold' 
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  {i + 1}
                </button>
              </li>
            ))}

            <li>
              <button 
                onClick={() => handlePageChange(page + 1)} 
                disabled={page === numberOfPages} 
                aria-label="Next Page" 
                className="px-3 py-2 border border-gray-300 rounded bg-gray-100 hover:bg-gray-200 disabled:bg-gray-300"
              >
                <i className="fas fa-arrow-right"></i>
              </button>
            </li>
          </ul>
        </nav>
      </div>
      <Foter/>
    </div>
  );
}



























