import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const MyWishlistContext = createContext();

export default function MyWishlistContextProvider({ children }) {
    const [NumberMywishList, setNumberMywishList] = useState(null);
    const baseUrl = 'https://ecommerce.routemisr.com/api/v1/wishlist';
    const headersOptional = {
        headers: {
            token: localStorage.getItem('token'),
        },
    };

    useEffect(() => {
        if (localStorage.getItem('token')) {
            getUrl().then((res) => {
                setNumberMywishList(res.data.data);
            });
        }
    }, []);

    function getUrl() {
        return axios.get(baseUrl, headersOptional);
    }
    
    function clearUrl() {
        return axios.delete(baseUrl, headersOptional);
    }

    function deleteUrl(id) {
        return axios.delete(`${baseUrl}/${id}`, headersOptional);
    }

    function updateUrl(id, count) {
        const data = {
            count: count
        };
        return axios.put(`${baseUrl}/${id}`, data, headersOptional);
    }

    function postUrll(id) {
        const data = {
            productId: id
        };
        return axios.post(baseUrl, data, headersOptional);
    }

    return (
        <MyWishlistContext.Provider value={{ getUrl, NumberMywishList, setNumberMywishList, postUrll, deleteUrl, clearUrl, updateUrl }}>
            {children}
        </MyWishlistContext.Provider>
    );
}
