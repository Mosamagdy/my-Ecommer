// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import Slider from 'react-slick';

// export default function CategoriesSlider() {
//     let [CategoriesList, setCategoriesList] = useState([]);

//     function getAllCategories() {
//         axios
//             .get('https://ecommerce.routemisr.com/api/v1/categories')
//             .then((response) => {
//                 setCategoriesList(response.data.data);
//             })
//             .catch((error) => {
//                 console.error('Error fetching categories:', error);
//             });
//     }

//     useEffect(() => {
//         getAllCategories();
//     }, []);

//     return (
//         <div>
//             <Slider  infinite autoplay speed={500}>
//                 {CategoriesList && CategoriesList.length >= 3 && (
//                     CategoriesList?.map((category, index) => {
//                         if (index < CategoriesList.length - 2) {
//                             return (
//                                 <div className='flex' key={index}>
//                                     <div className='flex w-full'>
//                                         <div className='w-9/12 '>
//                                             <img src={CategoriesList[index].image} className='w-full h-96   object-fill ' alt={CategoriesList[index].name} />
//                                         </div>
//                                         <div className='w-3/12 flex flex-col justify-between'>
//                                             <div className=''>
//                                                 <img src={CategoriesList[index + 1].image} className='w-full h-48 object-fill' alt={CategoriesList[index + 1].name} />
//                                             </div>
//                                             <div>
//                                                 <img src={CategoriesList[index + 2].image} className='w-full h-48  object-fill  ' alt={CategoriesList[index + 2].name} />
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             );
//                         }
//                         return null;
//                     })
//                 )}
//             </Slider>
//         </div>
//     );
// }
import React from "react";
import Slider from "react-slick";
import image1 from "../assets/images/1.jpg";
import image2 from "../assets/images/2.jpg";

import image4 from "../assets/images/4.jpg";
import image5 from "../assets/images/5.jpg"; // تصحيح المسار

const CategoriesList = [
  { name: " ", image: image1 },
  { name: " ", image: image2 },
  { name: " ", image: image4 },
  { name: " ", image: image5 }, // استخدام الصورة داخل السلايدر
];

export default function CategoriesSlider() {
  const settings = {
    infinite: true, // يجعل السلايدر يعمل بلا نهاية
    autoplay: true, // تشغيل تلقائي بدون تدخل المستخدم
    autoplaySpeed: 2000, // سرعة التمرير التلقائي (2 ثوانٍ)
    speed: 500, // سرعة الانتقال بين الشرائح
    slidesToShow: 4, // عدد الشرائح المعروضة في كل مرة
    slidesToScroll: 1, // تمرير شريحة واحدة في كل مرة
    arrows: false, // إزالة الأسهم الجانبية
    cssEase: "linear", // يجعل الحركة سلسة ومستدامة
    pauseOnHover: false, // يمنع التوقف عند مرور المؤشر فوق السلايدر
    pauseOnFocus: false, // يمنع التوقف عند التركيز على السلايدر
  };

  return (
    <div className="flex w-full mx-auto">
      <div className="w-full">
        <Slider {...settings}>
          {CategoriesList.map((category, index) => (
            <div className="flex" key={index}>
              <div className="w-full">
                <img
                  src={category.image}
                  className="w-full h-96 object-fill"
                  alt={category.name}
                />
                <h5 className="text-green-700 text-center mt-2">
                  {category.name}
                </h5>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}