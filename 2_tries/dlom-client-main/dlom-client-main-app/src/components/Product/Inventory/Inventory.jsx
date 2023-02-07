import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { TiArrowLeftThick } from "react-icons/ti";

import { getProducts } from "../../../redux/actions/products";
import Products from "./Products/Products";
import AddQtyForm from "./Form/AddQtyForm";
import SubQtyForm from "./Form/SubQtyForm";
import UpdateQtyForm from "./Form/UpdateQtyForm";
import DamagedQtyForm from "./Form/DamagedQtyForm";
const Inventory = () => {
  const dispatch = useDispatch();

  const [curProdId, setCurProdId] = useState(null);

  const [prodLog, setProdLog] = useState("");

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch, curProdId]);

  return (
    <>
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
        <h1>Inventory</h1>
      </div>
      <pre>{JSON.stringify(curProdId, null, 2)}</pre>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {/* <div>Selected Product</div> */}
        {/* <div>Form to : Add , Update , Mark Damaged, Remove</div> */}
        <div>
          {/* <Form curProdId={curProdId} setCurProdId={setCurProdId} /> */}
          {prodLog === "addQty" && (
            <AddQtyForm curProdId={curProdId} setCurProdId={setCurProdId} />
          )}
          {prodLog === "subQty" && (
            <SubQtyForm curProdId={curProdId} setCurProdId={setCurProdId} />
          )}
          {prodLog === "updateQty" && (
            <UpdateQtyForm curProdId={curProdId} setCurProdId={setCurProdId} />
          )}
          {prodLog === "markDamaged" && (
            <DamagedQtyForm curProdId={curProdId} setCurProdId={setCurProdId} />
          )}
        </div>
      </div>
      <div>
        <Products setProdLog={setProdLog} setCurProdId={setCurProdId} />
      </div>
    </>
  );
};

export default Inventory;
