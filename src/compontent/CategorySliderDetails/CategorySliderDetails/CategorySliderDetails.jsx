import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

export default function CategorySliderDetails() {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await axios.get("https://ecommerce.routemisr.com/api/v1/products/");
        const filteredProducts = res.data.data.filter(
          (product) => product.category?._id === id
        );

        setProducts(filteredProducts);
        if (filteredProducts.length > 0) {
          setCategoryName(filteredProducts[0].category.name);
        }
      } catch (error) {
        console.error("Error fetching category products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [id]);

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <span className="loader"></span>
        </div>
      ) : (
        <div className="p-5">
          <h2 className="text-2xl font-bold mb-5">{categoryName || "Category"}</h2>
          {products.length === 0 ? (
            <p>No products found for this category.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="p-4 mt-4 shadow-md dark:shadow-[0_4px_6px_rgba(255,255,255,0.1)] hover:border border-main duration-500 group overflow-hidden space-y-3"
                >
                  <Link to={`/ProductDetails/${product._id}/${product.title}`}>
                    <img src={product.imageCover} className="w-full" alt={product.title} />
                    <h5 className="text-main font-semibold">{product.name}</h5>
                    <h2 className="text-lg font-bold">
                      {product.title.split(" ").slice(0, 2).join(" ")}
                    </h2>
                    <div className="flex justify-between items-center">
                      <p className="text-gray-700 font-medium dark:text-gray-400">
                        {product.price} EGP
                      </p>
                      <span className="text-yellow-500 font-semibold flex items-center">
                        <i className="fa-solid fa-star mr-1"></i>
                        {product.ratingAverage}
                      </span>
                    </div>
                    <button className="bg-unhover-button border border-transparent px-4 py-2 mt-5 text-white translate-y-24 group-hover:translate-y-0 duration-500 rounded-md w-full hover:bg-main">
                      Add To Cart
                    </button>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
