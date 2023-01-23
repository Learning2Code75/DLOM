import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getProductlogs } from "../../../redux/actions/productlogs";

const Logs = () => {
  const productlogs = useSelector((state) => state.productlogs);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductlogs());
  }, [dispatch]);
  return (
    <>
      <div>Product logs</div>
      <Link to="/product">Product</Link>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gridGap: "10px",
          margin: "0 auto",
          maxWidth: "95vw",
          marginBottom: "2rem",
        }}
      >
        {productlogs?.map((p) => {
          let ts = new Date(p.timestamp).toString();
          let ts2 = new Date(p.createdAt).toString();

          return (
            <div
              style={{
                border: "1px solid black",
                overflowY: "scroll",
              }}
              key={p._id}
            >
              <pre>{JSON.stringify(p, null, 2)}</pre>
              {/* <div>SKU: {p.product.prodSKU}</div>
              <div>Prodname: {p.product.prodName}</div>
              <div>timestamp : {ts}</div>
              <div>timestamp2 : {ts2}</div>
              <div>operation : {p.operation}</div>
              <div>qty : {p.qty}</div>

              {p.damagedDescription !== "" && (
                <div>damagedDescription : {p.damagedDescription}</div>
              )} */}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Logs;
