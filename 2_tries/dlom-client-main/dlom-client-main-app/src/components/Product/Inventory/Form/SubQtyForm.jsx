import { Dialog, IconButton, useMediaQuery, useTheme } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { GrClose } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { ThemeContext } from "../../../../App";
import { createProductlog } from "../../../../redux/actions/productlogs";
import { updateProduct } from "../../../../redux/actions/products";

const SubQtyForm = ({ curProdId, setCurProdId, openDialog, setOpenDialog }) => {
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
  });

  const [addQty, setAddQty] = useState(0);

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
    setAddQty(0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(curProdId);
    let prodD = productData;
    prodD.qty = parseInt(productData.qty) - parseInt(addQty);
    // console.log(prodD);
    dispatch(updateProduct(curProdId, prodD));
    let new_prod_log = {
      product: { _id: curProdId },
      operation: "removed product",
      qty: addQty,
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
            <h2>Reduce Qty </h2>
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
            value={addQty}
            onChange={(e) => {
              setAddQty(e.target.value);
            }}
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

export default SubQtyForm;
