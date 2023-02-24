import { Dialog, IconButton, useMediaQuery, useTheme } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { GrClose } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { ThemeContext } from "../../../../App";
import { createProductlog } from "../../../../redux/actions/productlogs";
import {
  createProduct,
  updateProduct,
} from "../../../../redux/actions/products";

const DamagedQtyForm = ({
  curProdId,
  setCurProdId,
  openDialog,
  setOpenDialog,
}) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const tc = useContext(ThemeContext);
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const prodToUpdate = useSelector((state) =>
    curProdId ? state.products.find((p) => p._id === curProdId) : null
  );

  const [productData, setProductData] = useState({
    prodSKU: "",
    prodName: "",
    productUnitRate: "",
    prodTax: "",
    prodDesc: [],
    prodImgUrl: "",
    qty: 0,
    category: "",
    discount: "",
    damaged: "",
    damagedDescription: "",
  });

  const [damagedQty, setDamagedQty] = useState(0);

  useEffect(() => {
    if (prodToUpdate) {
      // console.log(prodToUpdate);
      setProductData(prodToUpdate);
    }
  }, [prodToUpdate]);
  const clear = () => {
    setCurProdId(null);
    setProductData({
      prodSKU: "",
      prodName: "",
      productUnitRate: "",
      prodTax: "",
      prodDesc: [],
      prodImgUrl: "",
      qty: 0,
      category: "",
      discount: "",
      damaged: "",
      damagedDescription: "",
    });
    setDamagedQty(0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let prodD = productData;
    let new_updated_prod = { ...prodD, damagedDescription: "" };
    if (parseInt(productData.qty) > parseInt(damagedQty)) {
      new_updated_prod.qty = parseInt(productData.qty) - parseInt(damagedQty);
    }
    // console.log(prodD);
    dispatch(updateProduct(curProdId, new_updated_prod));
    let new_prod = { ...prodD, qty: damagedQty, damaged: "damaged" };
    delete new_prod._id;
    new_prod.prodDesc = new_prod.prodDesc.map((pd) => ({
      title: pd.title,
      desc: pd.desc,
    }));
    // console.log(new_prod);
    dispatch(createProduct(new_prod));
    let new_prod_log = {
      product: { _id: curProdId },
      operation: "marked damaged",
      qty: damagedQty,
      damagedDescription: new_prod.damagedDescription,
    };
    dispatch(createProductlog(new_prod_log));
    clear();
    setOpenDialog(false);
  };
  return (
    <>
      <Dialog
        open={openDialog}
        fullWidth={true}
        fullScreen={fullScreen}
        // maxWidth={}
        onClose={(e, r) => {
          if (r === "backdropClick") {
            clear();
            setOpenDialog(!openDialog);
          } else {
            clear();
            setOpenDialog(!openDialog);
          }
        }}
        // PaperComponent={<PaperC />}
        PaperProps={{
          sx: {
            borderRadius: "1rem",
            background: tc.theme === "light" ? "#ebecf0" : "#232427",
            color: tc.theme === "light" ? "#1c1c1c" : "#ebecf0",
          },
        }}
        scroll={"body"}
        id={tc.theme}
      >
        <form autoComplete="off" className="css5Form" noValidate>
          <div className="FlexBetween">
            <h2>Mark Damaged</h2>
            <IconButton
              onClick={() => {
                setOpenDialog(false);
                clear();
              }}
              style={{
                background: tc.theme === "dark" ? "lightgrey" : "transparent",
                padding: ".25rem",
              }}
            >
              <GrClose />
            </IconButton>
          </div>

          <div className="formLabel">ProdSKU</div>
          <input
            name="prodSKU"
            value={productData.prodSKU}
            onChange={(e) =>
              setProductData({ ...productData, prodSKU: e.target.value })
            }
            disabled={true}
            className="formControl"
          />
          <div className="formLabel">Product Name</div>
          <input
            name="prodName"
            value={productData.prodName}
            onChange={(e) =>
              setProductData({ ...productData, prodName: e.target.value })
            }
            disabled={true}
            className="formControl"
          />

          <div className="formLabel">Qty</div>
          <input
            name="prodName"
            value={damagedQty}
            onChange={(e) => setDamagedQty(e.target.value)}
            className="formControl"
          />

          <div className="formLabel">Reason for marking damaged</div>
          <input
            name="damagedDescription"
            type="text"
            value={productData.damagedDescription}
            onChange={(e) => {
              setProductData({
                ...productData,
                damagedDescription: e.target.value,
              });
            }}
            placeholder="reason"
            className="formControl"
          />

          <div className="btn2" onClick={handleSubmit}>
            Submit
          </div>
          {/* <button onClick={clear}>Clear</button> */}
        </form>
      </Dialog>
      {/* <pre
        style={{
          overflow: "hidden",
        }}
      >
        {JSON.stringify(productData, null, 4)}
      </pre> */}
    </>
  );
};

export default DamagedQtyForm;
