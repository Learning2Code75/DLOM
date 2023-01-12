import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

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
      <div>
        Inventory
        <Link to="/product">Product</Link>
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
