import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Form from "./Form/Form";
import Products from "./Products/Products";
import { useDispatch } from "react-redux";
import { TiArrowLeftThick } from "react-icons/ti";

import { getProducts } from "../../../redux/actions/products";

const CRUD = () => {
  const dispatch = useDispatch();

  const [curProdId, setCurProdId] = useState(null);
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <Link
          to="/product"
          className="dashboardLink"
          style={{
            marginRight: "1rem",
            fontSize: "2em",
            color: "white",
            boxShadow:
              " inset 5px 5px 5px rgba(0,0,0,0.2),inset -5px -5px 15px rgba(255,255,255,0.1), 5px 5px 15px rgba(0,0,0,0.3),  -5px -5px 15px rgba(255,255,255,0.2)",
            borderRadius: ".64rem",
            padding: ".4rem .6rem",
            cursor: "pointer",
          }}
        >
          <TiArrowLeftThick
            style={{
              margin: "0",
              padding: "0",
            }}
          />
        </Link>
        <h1>Manage Products</h1>
      </div>
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
