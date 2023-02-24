import React from "react";
import Product from "./Product/Product";
import { useSelector } from "react-redux";

const Products = ({ setCurProdId, setOpenDialog }) => {
  const products = useSelector((state) => state.products);
  return (
    <>
      <h2>Products</h2>
      <div
        style={{
          margin: ".5rem",
          marginBottom: "5rem",
        }}
        className="css9BasicGrid"
      >
        {products?.map((p) => (
          <div
            style={{
              overflowX: "scroll",
            }}
            className="css1Card"
            key={p._id}
          >
            <Product
              p={p}
              setCurProdId={setCurProdId}
              setOpenDialog={setOpenDialog}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default Products;
