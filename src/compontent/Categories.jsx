
import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import Slider from 'react-slick';

export default function CategorySlider() {
  let [categories, setCategories] = useState([]);
  let sliderRef = useRef(null);

  async function GetAllProducts() {
    try {
      const res = await axios.get('https://ecommerce.routemisr.com/api/v1/products/');
      let categoryMap = new Map();
      res.data.data.forEach((product) => {
        if (!categoryMap.has(product.category._id)) {
          categoryMap.set(product.category._id, product.category);
        }
      });
      setCategories(Array.from(categoryMap.values()));
    } catch (error) {
      console.error('There was an error fetching the products!', error);
    }
  }

  useEffect(() => {
    GetAllProducts();
  }, []);

  const sliderSettings = {
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    speed: 1000, 
    slidesToShow: 3,
    slidesToScroll: 1, 
    cssEase: "linear", 
    pauseOnHover: false 
  };

  return (
    <div className="my-5 mt-10 relative">
      <Slider ref={sliderRef} {...sliderSettings}>
        {categories.map((category) => (
          <div key={category._id} className="cursor-default">
            <img
              src={category.image ? category.image : 'path/to/placeholder.jpg'}
              className="h-64 w-full object-cover object-top"
              alt={category.name ? category.name : 'Category Image'}
            />
            <h5 className="text-center">{category.name}</h5>
          </div>
        ))}
      </Slider>
    </div>
  );
}