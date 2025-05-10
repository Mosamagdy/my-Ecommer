import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/images/freshcart-logo.svg';

export default function Register() {
  let [errorMasseg, setError] = useState(null);
  let baseUrl = 'https://ecommerce.routemisr.com';
  let Navg = useNavigate();

  let validYup = Yup.object({
    name: Yup.string().required('name required').min(3, 'name char 2').max(20, 'name cher 20'),
    email: Yup.string().required('email required').email('enter valid email'),
    password: Yup.string().required('password required').matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/, 'password invald'),
    rePassword: Yup.string().required('Re-password is required').oneOf([Yup.ref('password')], 'Passwords do not match'),
    phone: Yup.string().required('phone required').matches(/^(010|011|012|015)\d{8}$/, 'enter valid phone'),
  });

  let registerForm = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
      rePassword: '',
    },
    onSubmit: RegisterApi,
    validationSchema: validYup,
  });

  async function RegisterApi(data) {
    let req = await axios.post(`${baseUrl}/api/v1/auth/signup`, data).then((req) => {
      if (req.data.message === 'success') {
        Navg('/Login');
        console.log(req);
      }
    })
    .catch((err) => {
      setError(err.response.data.message);
      console.log(err.response.data.message);
    });
  }

  return (
    <div  className="flex flex-col items-center bg-[#3D5A3C] text-white p-10 min-h-screen">
            <div className="w-2/5 mb-6 flex justify-center">
            <img src={logo} alt="Flowbite Logo" className="w-full max-w-md" />
          </div>
     
      {errorMasseg ? (
        <div className="p-4 mb-4 w-1/2 mx-auto text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          {errorMasseg}
        </div>
      ) : ''}
<form onSubmit={registerForm.handleSubmit} className="w-7/12 mx-auto shadow-2xl shadow-white/80 p-8">
  <div className="mb-5">
    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
    <input
      onChange={registerForm.handleChange}
      onBlur={registerForm.handleBlur}
      value={registerForm.values.name}
      type="text"
      id="name"
      name="name"
      placeholder="Enter your name"
      className="text-black bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
    />
    {registerForm.touched.name && registerForm.errors.name ? <p className="text-red-800">{registerForm.errors.name}</p> : ''}
  </div>

  <div className="mb-5">
    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
    <input
      onChange={registerForm.handleChange}
      onBlur={registerForm.handleBlur}
      value={registerForm.values.email}
      type="email"
      id="email"
      name="email"
      placeholder="Enter your email"
      className="text-black bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
    />
    {registerForm.touched.email && registerForm.errors.email ? <p className="text-red-800">{registerForm.errors.email}</p> : ''}
  </div>

  <div className="mb-5">
    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
    <input
      onChange={registerForm.handleChange}
      onBlur={registerForm.handleBlur}
      value={registerForm.values.password}
      type="password"
      id="password"
      name="password"
      placeholder="Enter your password"
      className="text-black bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
    />
    {registerForm.touched.password && registerForm.errors.password ? <p className="text-red-800">{registerForm.errors.password}</p> : ''}
  </div>

  <div className="mb-5">
    <label htmlFor="rePassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your rePassword</label>
    <input
      onChange={registerForm.handleChange}
      onBlur={registerForm.handleBlur}
      value={registerForm.values.rePassword}
      type="password"
      id="rePassword"
      name="rePassword"
      placeholder="Re-enter your password"
      className="text-black bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
    />
    {registerForm.touched.rePassword && registerForm.errors.rePassword ? <p className="text-red-800">{registerForm.errors.rePassword}</p> : ''}
  </div>

  <div className="mb-5">
    <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your phone</label>
    <input
      onChange={registerForm.handleChange}
      onBlur={registerForm.handleBlur}
      value={registerForm.values.phone}
      type="tel"
      id="phone"
      name="phone"
      placeholder="Enter your phone number"
      className="text-black bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
    />
    {registerForm.touched.phone && registerForm.errors.phone ? <p className="text-red-800">{registerForm.errors.phone}</p> : ''}
  </div>

  <button
    disabled={!(registerForm.isValid && registerForm.dirty)}
    type="submit"
    className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 disabled:bg-ring-800 disabled:bg-opacity-25"
  >
    Submit
  </button>
</form>

    </div>
  );
}








