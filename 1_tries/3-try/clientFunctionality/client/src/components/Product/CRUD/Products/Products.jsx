import React from "react";
import Product from "./Product/Product";
import { useSelector } from "react-redux";

const Products = () => {
  const products = useSelector((state) => state.products);
  console.log(products);
  return (
    <>
      <div>Products</div>

      <Product />

      <Product />

      <Product />
      <Product />
    </>
  );
};

export default Products;
