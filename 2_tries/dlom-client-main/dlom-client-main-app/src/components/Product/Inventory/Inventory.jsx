import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { TiArrowLeftThick } from "react-icons/ti";

import { getProducts } from "../../../redux/actions/products";
import Products from "./Products/Products";
import AddQtyForm from "./Form/AddQtyForm";
import SubQtyForm from "./Form/SubQtyForm";
import UpdateQtyForm from "./Form/UpdateQtyForm";
import DamagedQtyForm from "./Form/DamagedQtyForm";
import { ThemeContext } from "../../../App";
import InventoryCSV from "./InventoryCSV";
const Inventory = () => {
  const dispatch = useDispatch();
  const tc = useContext(ThemeContext);
  const products = useSelector((state) => state.products);

  const [curProdId, setCurProdId] = useState(null);

  const [prodLog, setProdLog] = useState("");
  const [addQtyDialog, setAddQtyDialog] = useState(false);
  const [subQtyDialog, setSubQtyDialog] = useState(false);
  const [updateQtyDialog, setUpdateQtyDialog] = useState(false);
  const [damagedQtyDialog, setDamagedQtyDialog] = useState(false);

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
        <h2>Inventory</h2>
      </div>
      <div className="dialogOpenContainer">
        <InventoryCSV invData={products} />
      </div>
      {/* <pre>{JSON.stringify(curProdId, null, 2)}</pre> */}
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
            <AddQtyForm
              openDialog={addQtyDialog}
              setOpenDialog={setAddQtyDialog}
              curProdId={curProdId}
              setCurProdId={setCurProdId}
            />
          )}
          {prodLog === "subQty" && (
            <SubQtyForm
              openDialog={subQtyDialog}
              setOpenDialog={setSubQtyDialog}
              curProdId={curProdId}
              setCurProdId={setCurProdId}
            />
          )}
          {prodLog === "updateQty" && (
            <UpdateQtyForm
              openDialog={updateQtyDialog}
              setOpenDialog={setUpdateQtyDialog}
              curProdId={curProdId}
              setCurProdId={setCurProdId}
            />
          )}
          {prodLog === "markDamaged" && (
            <DamagedQtyForm
              openDialog={damagedQtyDialog}
              setOpenDialog={setDamagedQtyDialog}
              curProdId={curProdId}
              setCurProdId={setCurProdId}
            />
          )}
        </div>
      </div>
      <div>
        <Products
          setProdLog={setProdLog}
          setCurProdId={setCurProdId}
          setAddQtyDialog={setAddQtyDialog}
          setSubQtyDialog={setSubQtyDialog}
          setUpdateQtyDialog={setUpdateQtyDialog}
          setDamagedQtyDialog={setDamagedQtyDialog}
        />
      </div>
    </>
  );
};

export default Inventory;
