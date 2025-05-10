import axios from 'axios';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

export default function CategoryBrands() {
    let { id } = useParams();
    let [mainImage, setMainImage] = useState(null);

    const getBrandDetails = async ({ queryKey }) => {
        const [_key, id] = queryKey;
        const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`);
        return data;
    };

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['brandDetails', id],
        queryFn: getBrandDetails
    });

    const brand = data?.data;

    if (isLoading) {
        return <div className='bg-stone-700 flex justify-center items-center h-screen'><span className="loader"></span></div>;
    }

    if (isError) {
        return <div className='text-red-500 text-center'>Failed to load brand details. Please try again later. Error: {error.message}</div>;
    }

    function changeImage(image) {
        setMainImage(image);
    }

    return (
        <div className='w-10/12 mx-auto my-5'>
            <div className='flex justify-between items-center'>
                <div className='w-3/12'>
                    <img src={mainImage || brand?.image} alt={brand?.name || 'Brand'} className='w-full' />
                    <div className='flex my-5'>
                        {brand?.images?.map((image, i) => (
                            <div key={i} className='w-1/4 p-1'>
                                <img onClick={() => changeImage(image)} src={image} className='w-full cursor-pointer' alt={`Brand Image ${i}`} />
                            </div>
                        ))}
                    </div>
                </div>
                <div className='w-8/12'>
                    <h5 className='text-green-700'>{brand?.name || 'Unknown Brand'}</h5>
                    <h2 className='text-zinc-600 my-5'>{brand?.slug || 'No Slug'}</h2>
                    <div className='flex justify-between'>
                        <span>{new Date(brand?.createdAt).toLocaleDateString()}</span>
                    </div>
                    <button className='bg w-full border-r rounded py-1 transition-transform duration-500 transform translate-y-10 group-hover:translate-y-0'>add to cart</button>
                </div>
            </div>
        </div>
    );
}
