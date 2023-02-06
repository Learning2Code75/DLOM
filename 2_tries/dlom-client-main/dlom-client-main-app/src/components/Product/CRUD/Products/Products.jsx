import React from "react";
import Product from "./Product/Product";
import { useSelector } from "react-redux";

const Products = ({ setCurProdId }) => {
  const products = useSelector((state) => state.products);
  return (
    <>
      <div>Products</div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gridGap: "10px",
          margin: "0 auto",
          maxWidth: "95vw",
          marginBottom: "2rem",
        }}
      >
        {products?.map((p) => (
          <div
            style={{
              border: "1px solid black",
              overflowY: "scroll",
            }}
            key={p._id}
          >
            <Product p={p} setCurProdId={setCurProdId} />
          </div>
        ))}
      </div>
    </>
  );
};

export default Products;
