import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Form from "./Form/Form";
import Products from "./Products/Products";
import { useDispatch } from "react-redux";

import { getProducts } from "../../../redux/actions/products";

const CRUD = () => {
  const dispatch = useDispatch();

  const [curProdId, setCurProdId] = useState(null);
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch, curProdId]);

  return (
    <div>
      CRUD
      <Link to="/product">Product</Link>
      <div>
        <Form curProdId={curProdId} setCurProdId={setCurProdId} />
      </div>
      <div>
        <Products setCurProdId={setCurProdId} />
      </div>
    </div>
  );
};

export default CRUD;
