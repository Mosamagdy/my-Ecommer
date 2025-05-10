import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'



export let Cartcontext=  createContext()
export default function CartContextProveder({children}) {
let [Nambercart, setNambercart]= useState(null)
let baseUrl=('https://ecommerce.routemisr.com/api/v1/cart')
let hederobshnal={
    headers :{
        token :localStorage.getItem('token'),
    },
};
useEffect(()=>{
  if(localStorage.getItem('token')){
    getUrl().then((req)=>{
      setNambercart(req.data.numOfCartItems)
    })
  }
},[])
function getUrl(){
   return axios.get(baseUrl,hederobshnal)
}
function ClierUrl(){
   return axios.delete(baseUrl,hederobshnal)
}
function delUrl(id){
   return axios.delete(`${baseUrl}/${id}`,hederobshnal)
}
function UpdetUrl(id,count){
  let data={
    count: count
  }
   return axios.put(`${baseUrl}/${id}`,data,hederobshnal)
}
function PostUrl(id){
  let data={
    productId: id
  }
   return axios.post(baseUrl, data,hederobshnal)
}


  return (
    <Cartcontext.Provider value={{getUrl ,Nambercart,setNambercart , PostUrl ,delUrl ,ClierUrl,UpdetUrl}} >{children}</Cartcontext.Provider >
  )
}
