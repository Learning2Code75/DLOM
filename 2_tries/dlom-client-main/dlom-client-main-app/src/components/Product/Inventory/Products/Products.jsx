import React from "react";
import Product from "./Product/Product";
import { useSelector } from "react-redux";

const Products = ({
  setCurProdId,
  setProdLog,
  setAddQtyDialog,
  setSubQtyDialog,
  setUpdateQtyDialog,
  setDamagedQtyDialog,
}) => {
  const products = useSelector((state) => state.products);
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
        {products?.map((p) => (
          <div className="css1Card" key={p._id}>
            <Product
              p={p}
              setCurProdId={setCurProdId}
              setProdLog={setProdLog}
              setAddQtyDialog={setAddQtyDialog}
              setSubQtyDialog={setSubQtyDialog}
              setUpdateQtyDialog={setUpdateQtyDialog}
              setDamagedQtyDialog={setDamagedQtyDialog}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default Products;
