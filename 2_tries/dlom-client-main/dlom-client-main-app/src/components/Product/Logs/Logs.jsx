import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getProductlogs } from "../../../redux/actions/productlogs";
import ProductlogsCSV from "./ProductlogsCSV";
import { TiArrowLeftThick } from "react-icons/ti";

const Logs = () => {
  const productlogs = useSelector((state) => state.productlogs);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductlogs());
  }, [dispatch]);
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
          className="dashboardLink"
          style={{
            marginRight: "1rem",
            fontSize: "2em",
            color: "white",
            boxShadow:
              " inset 5px 5px 5px rgba(0,0,0,0.2),inset -5px -5px 15px rgba(255,255,255,0.1), 5px 5px 15px rgba(0,0,0,0.3),  -5px -5px 15px rgba(255,255,255,0.2)",
            borderRadius: ".64rem",
            padding: ".4rem .6rem",
            cursor: "pointer",
          }}
        >
          <TiArrowLeftThick
            style={{
              margin: "0",
              padding: "0",
            }}
          />
        </Link>
        <h1>Inventory Logs</h1>
      </div>

      <ProductlogsCSV prodLogsData={productlogs} />

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
