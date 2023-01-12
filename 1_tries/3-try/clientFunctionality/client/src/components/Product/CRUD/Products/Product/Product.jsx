import React from "react";
import moment from "moment";
import { useDispatch } from "react-redux";
import { deleteProduct } from "../../../../../redux/actions/products";
const Product = ({ p, setCurProdId }) => {
  const dispatch = useDispatch();
  return (
    <>
      <div>Product</div>
      <div>
        <div>SKU:{p.prodSKU}</div>
        <div
          style={{
            overflow: "contain",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <img src={p.prodImgUrl} />
        </div>
        <div>Name : {p.prodName}</div>
        <div>Unit Rate : {p.productUnitRate}</div>
        <div>Tax : {p.prodTax}</div>
        <div>Qty : {p.qty}</div>
        <div>Category : {p.category}</div>
        <div>Discount : {p.discount}</div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          {p.prodDesc.map((pd) => (
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                width: "100%",
                borderBottom: "1px solid lightgrey",
              }}
            >
              <h6>{pd.title}</h6>
              <p>{pd.desc}</p>
            </div>
          ))}
        </div>
        <div>
          Created : {moment(p.createdAt).fromNow()} [{p.createdAt}]
        </div>
        <div
          style={{
            display: "flex",
          }}
        >
          <button onClick={() => setCurProdId(p._id)}>Update</button>
          <button onClick={() => dispatch(deleteProduct(p._id))}>Delete</button>
        </div>
      </div>

      <pre
        style={{
          overflow: "hidden",
        }}
      >
        {JSON.stringify(p, null, 2)}
      </pre>
    </>
  );
};

export default Product;
