import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

export default function ForgotPassword() {
  let [errorMessage, setError] = useState(null);
  let [FrmDispiy, setFrmDispiy] = useState(true);
  let navg = useNavigate();

  let initialValuesForgot = {
    email: '',
  };

  let initialValuesResetCode = {
    resetCode: '',
  };

  let validationSchemaForgot = Yup.object({
    email: Yup.string()
      .required('Email required')
      .email('Enter a valid email'),
  });

  let validationSchemaResetCode = Yup.object({
    resetCode: Yup.string()
      .required('Reset code required')
  });

  let Forgtform = useFormik({
    initialValues: initialValuesForgot,
    onSubmit: ForgtApi,
    validationSchema: validationSchemaForgot,
  });

  let verifyResetCodeform = useFormik({
    initialValues: initialValuesResetCode,
    onSubmit: verifyResetCodeApi,
    validationSchema: validationSchemaResetCode,
  });

  function verifyResetCodeApi(data) {
    axios
      .post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', data)
      .then((response) => {
        console.log(response.data);  
        if (response.data.status === "Success") {
          navg('/Updetpasswoerd');  
          console.log(response.data);
        }
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
  }

  function ForgtApi(data) {
    axios
      .post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', data)
      .then((response) => {
        console.log(response.data);  
        if (response.data.statusMsg === 'success') {
          setFrmDispiy(false);  
        }
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
  }

  return (
<div style={{ minHeight: "100vh", backgroundColor: "#3D5A3C", color: "#FFF", padding: "20px" }}>
      {FrmDispiy ? (
        <div>
          <h2>Forgot Password</h2>
          <form className="w-7/12 mx-auto shadow-2xl shadow-white/80 p-8" onSubmit={Forgtform.handleSubmit}>
            <div className="mb-5">
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Your email
              </label>
              <input
                type="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@flowbite.com"
                required
                value={Forgtform.values.email}
                onChange={Forgtform.handleChange}
                onBlur={Forgtform.handleBlur}
              />
              {Forgtform.touched.email && Forgtform.errors.email ? (
                <div className="text-red-600">{Forgtform.errors.email}</div>
              ) : null}
            </div>
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Send
            </button>
          </form>
        </div>
      ) : (
        <div>
          <h2>Reset Code</h2>
          <form className="w-7/12 mx-auto shadow-2xl shadow-white/80 p-8" onSubmit={verifyResetCodeform.handleSubmit}>
            <div className="mb-5">
              <label htmlFor="resetCode" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Your reset code
              </label>
              <input
                type="text"
                id="resetCode"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter reset code"
                required
                value={verifyResetCodeform.values.resetCode}
                onChange={verifyResetCodeform.handleChange}
                onBlur={verifyResetCodeform.handleBlur}
              />
              {verifyResetCodeform.touched.resetCode && verifyResetCodeform.errors.resetCode ? (
                <div className="text-red-600">{verifyResetCodeform.errors.resetCode}</div>
              ) : null}
            </div>
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Verify Code
            </button>
          </form>
        </div>
      )}
      {errorMessage && (
        <div className="p-4 mt-4 text-sm text-red-800 bg-red-50 rounded-lg dark:bg-gray-800 dark:text-red-400" role="alert">
          {errorMessage}
        </div>
      )}
  </div>
  );
}
