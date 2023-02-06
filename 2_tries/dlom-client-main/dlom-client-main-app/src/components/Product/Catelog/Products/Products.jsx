import React from "react";
import Product from "./Product/Product";
import { useSelector } from "react-redux";

const Products = ({ setCurProdId, prodsForCatelog, setProdsForCatelog }) => {
  const products = useSelector((state) => state.products);
  console.log(products);
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
              border: "2px solid lightgrey",
              overflow: "scroll",
              padding: "0",
              borderRadius: "1rem",
            }}
            key={p._id}
          >
            <Product
              p={p}
              setCurProdId={setCurProdId}
              prodsForCatelog={prodsForCatelog}
              setProdsForCatelog={setProdsForCatelog}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default Products;
