import axios from 'axios';
import { useFormik } from 'formik';
import React from 'react';
import { useParams } from 'react-router-dom';
import * as Yup from 'yup';

export default function ShippingDetails() {
  let { id } = useParams();

  const validationSchema = Yup.object({
    city: Yup.string()
      .required('City is required'),
    details: Yup.string()
      .required('Details are required'),
    phone: Yup.string()
      .matches(/^[0-9]+$/, "Phone number must be only digits")
      .min(10, 'Phone number must be at least 10 digits')
      .required('Phone number is required')
  });

  let ChecCartPayVales = useFormik({
    initialValues: {
      city: '',
      details: '',
      phone: '',
    },
    validationSchema: validationSchema,
    onSubmit: ChecCartPay,
  });

  let hederobshnal = {
    headers: {
      token: localStorage.getItem('token'),
    },
  };

  function ChecCartPay(values) {
    let data = {
      shippingAddress: values,
    };
    axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=http://localhost:5173`, data, hederobshnal)
      .then((req) => {
        console.log(req);
        window.open(req.data.session.url, '_self');
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }

  return (
  <div style={{ backgroundColor: "#3D5A3C", color: "#FFF", padding: "20px" }}>
<div className='w-7/12 mx-auto'>
      <h1>Shipping Details</h1>
      <form onSubmit={ChecCartPayVales.handleSubmit}>
        <div className='mb-5'>
          <label htmlFor='details' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Your details</label>
          <input
            type='text'
            id='details'
                 className="text-black bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder='Enter your details '
            required
            value={ChecCartPayVales.values.details}
            onChange={ChecCartPayVales.handleChange}
            onBlur={ChecCartPayVales.handleBlur}
          />
          {ChecCartPayVales.touched.details && ChecCartPayVales.errors.details ? (
            <div className='text-red-600'>{ChecCartPayVales.errors.details}</div>
          ) : null}
        </div>
        <div className='mb-5'>
          <label htmlFor='city' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Your city</label>
          <input
            type='text'
            id='city'
                 className="text-black bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder=' Enter your city'
            required
            value={ChecCartPayVales.values.city}
            onChange={ChecCartPayVales.handleChange}
            onBlur={ChecCartPayVales.handleBlur}
          />
          {ChecCartPayVales.touched.city && ChecCartPayVales.errors.city ? (
            <div className='text-red-600'>{ChecCartPayVales.errors.city}</div>
          ) : null}
        </div>
        <div className='mb-5'>
          <label htmlFor='phone' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Your Phone</label>
          <input
            type='text'
            id='phone'
                 className="text-black bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder='Enter your phone'
            required
            value={ChecCartPayVales.values.phone}
            onChange={ChecCartPayVales.handleChange}
            onBlur={ChecCartPayVales.handleBlur}
          />
          {ChecCartPayVales.touched.phone && ChecCartPayVales.errors.phone ? (
            <div className='text-red-600'>{ChecCartPayVales.errors.phone}</div>
          ) : null}
        </div>
        <button type='submit' className='text-center block text-2xl text-white w-full bg-green-700 py-2 my-3'>
          Pay <i className='fab fa-cc-visa text-2xl text-white'></i>
        </button>
      </form>
    </div>
</div>
  );
}
