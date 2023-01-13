import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProductlog } from "../../../../redux/actions/productlogs";
import {
  createProduct,
  updateProduct,
} from "../../../../redux/actions/products";

const DamagedQtyForm = ({ curProdId, setCurProdId }) => {
  const dispatch = useDispatch();
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
    dispatch(createProduct(new_prod));
    let new_prod_log = {
      product: { _id: curProdId },
      operation: "marked damaged",
      qty: damagedQty,
      damagedDescription: new_prod.damagedDescription,
    };
    dispatch(createProductlog(new_prod_log));
    clear();
  };
  return (
    <>
      <form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <h2>Mark Damaged</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            margin: "0 auto",
            maxWidth: "85vw",
            gridGap: ".5rem",
          }}
        >
          <div>ProdSKU</div>
          <input
            name="prodSKU"
            value={productData.prodSKU}
            onChange={(e) =>
              setProductData({ ...productData, prodSKU: e.target.value })
            }
            disabled={true}
          />
          <div>Product Name</div>
          <input
            name="prodName"
            value={productData.prodName}
            onChange={(e) =>
              setProductData({ ...productData, prodName: e.target.value })
            }
            disabled={true}
          />

          <div>Qty</div>
          <input
            name="prodName"
            value={damagedQty}
            onChange={(e) => setDamagedQty(e.target.value)}
          />

          <div>Reason for marking damaged</div>
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
          />
        </div>

        <button type="submit">Submit</button>
        <button onClick={clear}>Clear</button>
      </form>
      <pre
        style={{
          overflow: "hidden",
        }}
      >
        {JSON.stringify(productData, null, 4)}
      </pre>
    </>
  );
};

export default DamagedQtyForm;
