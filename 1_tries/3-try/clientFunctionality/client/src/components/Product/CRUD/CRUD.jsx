import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Form from "./Form/Form";
import Products from "./Products/Products";
import { useDispatch } from "react-redux";

import { getProducts } from "../../../redux/actions/products";

const CRUD = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
  return (
    <div>
      CRUD
      <Link to="/product">Product</Link>
      <div>
        <Form />
      </div>
      <div>
        <Products />
      </div>
    </div>
  );
};

export default CRUD;
