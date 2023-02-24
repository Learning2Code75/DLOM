import React from "react";
import Product from "./Product/Product";
import { useSelector } from "react-redux";

const Products = ({ setCurProdId, prodsForCatelog, setProdsForCatelog }) => {
  const products = useSelector((state) => state.products);
  console.log(products);
  return (
    <>
      <h3>Products</h3>
      <div
        style={{
          margin: ".5rem",
          marginBottom: "5rem",
        }}
        className="css9BasicGrid"
      >
        {products
          ?.filter((p) => p.damaged !== "damaged")
          .map((p) => (
            <div key={p._id}>
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
