import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getProductlogs } from "../../../redux/actions/productlogs";
import ProductlogsCSV from "./ProductlogsCSV";
import { TiArrowLeftThick } from "react-icons/ti";
import { ThemeContext } from "../../../App";

const Logs = () => {
  const tc = useContext(ThemeContext);
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
          className="openStylesButton1"
          style={{
            marginRight: "1rem",
            borderRadius: ".64rem",
            padding: ".6rem",
            cursor: "pointer",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: tc.theme === "light" ? "#232427" : "#ebecf0",
          }}
        >
          <TiArrowLeftThick
            style={{
              margin: "0",
              padding: "0",
            }}
          />
        </Link>
        <h2>Inventory Logs</h2>
      </div>

      <ProductlogsCSV prodLogsData={productlogs} />

      <div
        style={{
          margin: "1rem .5rem",
          marginBottom: "5rem",
        }}
        className="css9BasicGrid"
      >
        {productlogs?.map((p) => {
          let ts = new Date(p.timestamp).toString();
          let ts2 = new Date(p.createdAt).toString();

          return (
            <div
              style={{
                border: "1px solid black",
                // overflowY: "scroll",
              }}
              className="css1Card"
              key={p._id}
            >
              <div className="css1ContentBx">
                <div className="tag">Product</div>
                <div className="info">
                  {p?.product?.prodName}[{p?.product?.prodSKU}]
                </div>

                {p?.damagedDescription?.length !== 0 && (
                  <>
                    <div className="tag">Damaged</div>
                    <div className="info">{p?.damagedDescription}</div>
                  </>
                )}

                <div className="tag">Qty</div>
                <div className="info">{p?.qty}</div>

                <div className="tag">Operation</div>
                <div className="info">{p?.operation}</div>

                <div className="tag">Timestamp</div>
                <div className="info">
                  {new Date(p?.createdAt).toDateString() + " "}[
                  {new Date(p?.createdAt).toTimeString().split(" ")[0]}]
                </div>
              </div>

              {/* <pre>{JSON.stringify(p, null, 2)}</pre> */}
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
