import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Form from "./Form/Form";
import Products from "./Products/Products";
import { useDispatch } from "react-redux";
import { TiArrowLeftThick } from "react-icons/ti";

import { getProducts } from "../../../redux/actions/products";
import { ThemeContext } from "../../../App";

const CRUD = () => {
  const dispatch = useDispatch();
  const tc = useContext(ThemeContext);

  const [curProdId, setCurProdId] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

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
          className="openStylesButton1"
          style={{
            marginRight: "1rem",
            borderRadius: ".64rem",
            padding: ".6rem",
            cursor: "pointer",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: tc.theme === "light" ? "#232427" : "#ebecf0",
          }}
        >
          <TiArrowLeftThick
            style={{
              margin: "0",
              padding: "0",
            }}
          />
        </Link>
        <h2>Manage Products</h2>
      </div>
      <div>
        <Form
          curProdId={curProdId}
          setCurProdId={setCurProdId}
          openDialog={openDialog}
          setOpenDialog={setOpenDialog}
        />
      </div>
      <div>
        <Products
          setCurProdId={setCurProdId}
          openDialog={openDialog}
          setOpenDialog={setOpenDialog}
        />
      </div>
    </div>
  );
};

export default CRUD;
