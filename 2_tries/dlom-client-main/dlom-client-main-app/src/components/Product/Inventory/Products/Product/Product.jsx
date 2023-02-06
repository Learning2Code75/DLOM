import React from "react";
import moment from "moment";
import { useDispatch } from "react-redux";
import { deleteProduct } from "../../../../../redux/actions/products";
const Product = ({ p, setCurProdId, setProdLog }) => {
  const dispatch = useDispatch();
  return (
    <>
      <div
        style={{
          padding: "1em",
          borderRadius: "1rem",
          background: "rgba(0,0,0,0.89)",
          color: "#f0f0f0",
        }}
      >
        <div>SKU:{p.prodSKU}</div>
        <div
          style={{
            overflow: "contain",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <img width={350} height={350} src={p.prodImgUrl} />
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
        <div>Created at : {moment(p.createdAt).fromNow()}</div>

        {/* <button onClick={() => setCurProdId(p._id)}>Update</button> */}
        {p.damaged === "damaged" && (
          <button onClick={() => dispatch(deleteProduct(p._id))}>Delete</button>
        )}
        {p.damaged === "normal" && (
          <div
            style={{
              display: "flex",
            }}
          >
            <button
              className="btn"
              onClick={() => {
                setCurProdId(p._id);
                setProdLog("addQty");
              }}
            >
              Add Qty
            </button>
            <button
              className="btn"
              onClick={() => {
                setCurProdId(p._id);
                setProdLog("subQty");
              }}
            >
              Reduce Qty
            </button>

            <button
              className="btn"
              onClick={() => {
                setCurProdId(p._id);
                setProdLog("updateQty");
              }}
            >
              Update Qty
            </button>
            <button
              className="btn"
              onClick={() => {
                setCurProdId(p._id);
                setProdLog("markDamaged");
              }}
            >
              Mark Damaged
            </button>
          </div>
        )}
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
