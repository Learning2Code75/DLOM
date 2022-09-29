import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { getProducts } from "../../../redux/actions/products";
import Products from "./Products/Products";
import Form from "./Form/Form";
const Inventory = () => {
  const dispatch = useDispatch();

  const [curProdId, setCurProdId] = useState(null);
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch, curProdId]);
  return (
    <>
      <div>
        Inventory
        <Link to="/product">Product</Link>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div>Selected Product</div>
        <div>Form to : Add , Update , Mark Damaged, Remove</div>
        <div>
          <Form curProdId={curProdId} setCurProdId={setCurProdId} />
        </div>
      </div>
      <div>
        <Products setCurProdId={setCurProdId} />
      </div>
    </>
  );
};

export default Inventory;
