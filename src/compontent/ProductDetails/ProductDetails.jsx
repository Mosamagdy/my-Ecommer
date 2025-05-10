import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Toaster, toast } from 'react-hot-toast';
import { Cartcontext } from '../../Context/CartContextProveder';

export default function ProductDetails() {
    let { id } = useParams();
    let [mainImage, setMainImage] = useState(null);
     let {PostUrl,  setNambercart} = useContext(Cartcontext);

    const getProductDetails = async ({ queryKey }) => {
        const [_key, id] = queryKey;
        const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
        return data;
    };

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['productDetails', id],
        queryFn: getProductDetails
    });

    const product = data?.data;

    if (isLoading) {
        return <div className='bg-stone-700 flex justify-center items-center h-screen'><span className="loader"></span></div>;
    }

    if (isError) {
        return <div className='text-red-500 text-center'>Failed to load product details. Please try again later. Error: {error.message}</div>;
    }

    function changeImage(image) {
        setMainImage(image);
    }
      function addCart(id){
        PostUrl(id).then((req)=>{
          setNambercart(req.data.numOfCartItems);
          toast.success(req.data.message);
        })
      }

    return (
        
<div style={{ backgroundColor: "#3D5A3C", color: "#FFF", padding: "20px" }}>
        <Toaster />
      <div className='w-10/12 mx-auto my-5'>
            <div className='flex justify-between items-center'>
                <div className='w-3/12'>
                    <img src={mainImage || product?.imageCover} alt={product?.title} className='w-full' />
                    <div className='flex my-5'>
                        {product?.images?.map((image, i) => (
                            <div key={i} className='w-1/4 p-1'>
                                <img onClick={() => changeImage(image)} src={image} className='w-full cursor-pointer' alt={product?.title} />
                            </div>
                        ))}
                    </div>
                </div>
                <div className='w-8/12'>
                    <h5 className='text-green-700'>{product?.category?.name}</h5>
                    <h2 className='text-green-600 my-5'>{product?.title}</h2>
                    <div className='flex justify-between'>
                        <span>{product?.price} EGP</span>
                        <span><i className='fa-solid fa-star text-yellow-300'></i> {product?.ratingsAverage}</span>
                    </div>
                    <button onClick={() => addCart(id)} className='bg w-full border-r rounded py-1 transition-transform duration-500 transform translate-y-10 group-hover:translate-y-0'>add to cart</button>
                </div>
            </div>
        </div>


 </div>
    );
}
