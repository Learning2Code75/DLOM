import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProductlog } from "../../../../redux/actions/productlogs";
import { updateProduct } from "../../../../redux/actions/products";

const UpdateQtyForm = ({ curProdId, setCurProdId }) => {
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
  };
  return (
    <>
      <form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <h2>Update Qty </h2>
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

          <div>qty[Previous:{productData.qty}]</div>
          <input
            name="qty"
            type="number"
            value={productData.qty}
            onChange={(e) => {
              setProductData({ ...productData, qty: e.target.value });
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

export default UpdateQtyForm;
