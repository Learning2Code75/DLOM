import { Dialog, IconButton, useMediaQuery, useTheme } from "@mui/material";
import React, { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import FileBase from "react-file-base64";
import { GrClose } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { ThemeContext } from "../../../../App";
import {
  createProduct,
  getProducts,
  updateProduct,
} from "../../../../redux/actions/products";
import { createOp } from "../../../../redux/actions/users";
import DescInput from "./DescInput";

const Form = ({ curProdId, setCurProdId, openDialog, setOpenDialog }) => {
  const dispatch = useDispatch();
  const tc = useContext(ThemeContext);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const user = useSelector((state) => state?.auth?.authData?.result);
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
      console.log(prodToUpdate);
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
    console.log(curProdId);
    let prodD = { ...productData };
    // let new_prodDesc_arr = prodD.prodDesc;
    // new_prodDesc_arr.pop();
    // prodD.prodDesc = new_prodDesc_arr;
    prodD.prodDesc = prodD.prodDesc.map((pd) => ({
      title: pd.title,
      desc: pd.desc,
    }));
    console.log(prodD);
    if (curProdId) {
      dispatch(updateProduct(curProdId, prodD));
    } else {
      dispatch(
        createOp({
          dlom_client: { _id: user?.dlom_client },
          operation_type: "product create",
        })
      );
      dispatch(createProduct(prodD));
    }
    clear();
    setOpenDialog(false);
  };

  return (
    <>
      {/* <pre>{JSON.stringify(productData, null, 2)}</pre> */}
      <div className="dialogOpenContainer">
        <div className="openStylesButton1" onClick={() => setOpenDialog(true)}>
          Create Product
        </div>
      </div>

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
            <h2>{curProdId ? "Update" : "Create"} Product</h2>
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
            placeholder="product SKU"
            className="formControl"
          />
          <div className="formLabel">Product Name</div>
          <input
            name="prodName"
            value={productData.prodName}
            onChange={(e) =>
              setProductData({ ...productData, prodName: e.target.value })
            }
            placeholder="product name"
            className="formControl"
          />

          <div className="formLabel">Product Unit Rate</div>
          <input
            name="productUnitRate"
            value={productData.productUnitRate}
            onChange={(e) =>
              setProductData({
                ...productData,
                productUnitRate: e.target.value,
              })
            }
            placeholder="product unit rate"
            className="formControl"
          />
          <div className="formLabel">Product Tax Rate</div>
          <input
            name="prodTax"
            value={productData.prodTax}
            onChange={(e) =>
              setProductData({ ...productData, prodTax: e.target.value })
            }
            placeholder="product tax rate"
            className="formControl"
          />
          <div className="formLabel">Product Description</div>

          <div>
            <div
              onClick={(e) => {
                e.preventDefault();
                let new_desc_arr = [...productData.prodDesc];
                new_desc_arr.push({ title: "", desc: "" });
                setProductData({ ...productData, prodDesc: new_desc_arr });
              }}
              className="btn1"
              style={{
                margin: "0 0 0 .4em",
                padding: ".4rem 0",
                width: "20%",
              }}
            >
              +
            </div>
            {productData.prodDesc.map((pd, idx) => (
              <DescInput
                pd={pd}
                productData={productData}
                setProductData={setProductData}
                idx={idx}
              />
            ))}
          </div>

          <div className="formLabel">Product Img</div>
          <div className="btn1">
            <FileBase
              type="File"
              multiple={false}
              onDone={({ base64 }) =>
                setProductData({ ...productData, prodImgUrl: base64 })
              }
            />
          </div>

          <div className="formLabel">qty</div>
          <input
            name="qty"
            type="number"
            value={productData.qty}
            onChange={(e) =>
              setProductData({ ...productData, qty: e.target.value })
            }
            placeholder="product qty"
            className="formControl"
          />
          <div className="formLabel">category</div>
          <input
            name="category"
            value={productData.category}
            onChange={(e) =>
              setProductData({ ...productData, category: e.target.value })
            }
            placeholder="product category"
            className="formControl"
          />
          <div className="formLabel">discount</div>
          <input
            name="discount"
            value={productData.discount}
            onChange={(e) =>
              setProductData({ ...productData, discount: e.target.value })
            }
            placeholder="product discount rate"
            className="formControl"
          />

          <div onClick={handleSubmit} type="submit" className="btn2">
            {curProdId ? "Update Product" : "Create Product"}
          </div>
          {/* <div onClick={clear}>Clear</div> */}
        </form>
      </Dialog>

      <pre
        style={{
          overflow: "hidden",
        }}
      >
        {/* {JSON.stringify(productData, null, 4)} */}
      </pre>
      {/* <pre>{JSON.stringify(curProdId, null, 2)}</pre> */}
    </>
  );
};

export default Form;
