import { Dialog, IconButton, useMediaQuery, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { GrClose } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { ThemeContext } from "../../../../App";
import { createProductlog } from "../../../../redux/actions/productlogs";
import { updateProduct } from "../../../../redux/actions/products";

const UpdateQtyForm = ({
  curProdId,
  setCurProdId,
  openDialog,
  setOpenDialog,
}) => {
  const dispatch = useDispatch();
  const tc = useContext(ThemeContext);
  const theme = useTheme();
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
  });

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
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let prodD = productData;
    // console.log(prodD);
    dispatch(updateProduct(curProdId, prodD));
    let new_prod_log = {
      product: { _id: curProdId },
      operation: "updated product qty",
      qty: prodD.qty,
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
            <h2>Update Qty</h2>
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

          <div className="formLabel">qty[Previous:{productData.qty}]</div>
          <input
            name="qty"
            type="number"
            value={productData.qty}
            onChange={(e) => {
              setProductData({ ...productData, qty: e.target.value });
            }}
            className="formControl"
          />

          <div onClick={handleSubmit} className="btn2">
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

export default UpdateQtyForm;
