
import axios from 'axios';
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import SimpleSlider from '../../SimpleSlider/SimpleSlider';
import CategoriesSlider from '../../categories/CategoriesSlider';
import ims from '../../assets/images/411.jpg'; 

const fetchProducts = async ({ queryKey }) => {
  const [_, page] = queryKey;
  console.log("⏳ Fetching data for page:", page);

  try {
    const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands?page=${page}`);
    console.log("✅ API Response:", response.data);

    if (!response.data || response.data.results === 0 || response.data.data.length === 0) {
      console.warn(" No data found for page:", page);
      throw new Error("No data available."); 
    }

    return response.data;
  } catch (error) {
    console.error(" API Error:", error);
    throw error;
  }
};

export default function Brands() {
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['products', page],
    queryFn: fetchProducts,
    keepPreviousData: false, 
  });

  console.log("🔄 Loading Status:", isLoading);
  console.log("⚠️ Error Detected:", isError, error);

  const handlePageChange = (newPage) => {
    setPage(newPage);
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
      <div className='w-11/12 mx-auto p-2'>
        <div className='my-5'>
          <SimpleSlider />
          <CategoriesSlider />
        </div>
        <div className='flex flex-wrap'>
          {data?.data?.map((product) => (
            <div key={product._id} className='lg:w-3/12 md:w-4/12 sm:w-6/12 w-full p-2'>
              <Link to={`/CategoryBrands/${product._id}`}>
                <div className='item p-1 group overflow-hidden hover:shadow-2xl hover:shadow-green-500'>
                  <img src={product.image} alt={product.name || 'Product'} className='w-full' />
                  <h5 className='text-green-700'>{product.name || 'Unknown Brand'}</h5>
                  <h2>{product.slug ? product.slug.split(" ").slice(0, 2).join(" ") : 'No Slug'}</h2>
                  <button className='bg w-full border-r rounded py-1 transition-transform duration-500 transform translate-y-10 group-hover:translate-y-0'>
                    View brand
                  </button>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}