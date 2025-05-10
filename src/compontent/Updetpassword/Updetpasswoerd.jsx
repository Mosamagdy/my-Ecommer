import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

export default function UpdatePassword() {
  const [errorMessage, setError] = useState(null);
  const navigate = useNavigate();

  const initialValues = {
    email: '',
    newPassword: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .required('Email required')
      .email('Enter a valid email'),
    newPassword: Yup.string()
      .required('New password required')
      .min(6, 'Password must be at least 6 characters'),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (data) => {
      try {
        const response = await axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', data);
        console.log(response.data);
        if(response.data.token){
            navigate('/Login')
        }
      } catch (err) {
        setError(err.response.data.message);
      }
    }
  });

  return (
   <div style={{ minHeight: "100vh", backgroundColor: "#3D5A3C", color: "#FFF", padding: "20px" }}>
      <h2>Update Password</h2>
      <form className="max-w-sm mx-auto" onSubmit={formik.handleSubmit}>
        <div className="mb-5">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
          <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required 
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="text-red-600">{formik.errors.email}</div>
          ) : null}
        </div>
        <div className="mb-5">
          <label htmlFor="newPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your new password</label>
          <input type="password" id="newPassword" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required 
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.newPassword && formik.errors.newPassword ? (
            <div className="text-red-600">{formik.errors.newPassword}</div>
          ) : null}
        </div>
        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update Password</button>
      </form>
      {errorMessage && (
        <div className="p-4 mt-4 text-sm text-red-800 bg-red-50 rounded-lg dark:bg-gray-800 dark:text-red-400" role="alert">
          {errorMessage}
        </div>
      )}
    </div>
  );
}
