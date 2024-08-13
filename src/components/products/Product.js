import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./Product.css";

import { contextStore } from "../..";
import { fetchAddCartItems, fetchSingleProduct } from "../AxiosFunctions";

const Product = () => {
  const [product, setProduct] = useState(null);
  const { token, setItemslen } = useContext(contextStore);
  const location = useLocation();
  const {
    selectedProduct,
    selectedAreaName,
    selectedCategoryName,
    selectedShopName,
  } = location.state;
  const [cartProducts, setCartProducts] = useState({
    productname: " ",
    cost: null,
    description: " ",
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetchSingleProduct(
          selectedAreaName,
          selectedCategoryName,
          selectedShopName,
          selectedProduct
        );
        // Set cartProducts after product is fetched
        setCartProducts({
          productname: res.productname,
          cost: res.cost,
          description: res.description,
        });
        setProduct(res);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    if (
      selectedShopName &&
      selectedAreaName &&
      selectedCategoryName &&
      selectedProduct
    ) {
      fetchProduct();
    }
  }, [
    selectedShopName,
    selectedAreaName,
    selectedCategoryName,
    selectedProduct,
  ]);

  const addtoCart = async () => {
    try {
      const res = await fetchAddCartItems(cartProducts, token);

      console.log(res);
      setItemslen((prev) => prev + 1);
      alert("Item added successfully");
    } catch (error) {
      alert("Item adding failed");
    }
  };
  return (
    <div className="product-container">
      {product ? (
        <div className="product-content">
          <img
            className="product-image"
            src={`"https://mini-market-api.onrender.com/${product.image}`}
            alt={product.productname}
          />
          <div className="product-details">
            <h1>Prouct Name : {product.productname}</h1>
            <p>Description : {product.description}</p>
            <p>Price : {product.cost}</p>
            <button type="button" onClick={addtoCart}>
              Add To Cart
            </button>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Product;
