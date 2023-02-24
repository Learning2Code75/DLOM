import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getOrderlogs } from "../../redux/actions/orderlogs";
import OrderLogsCSV from "./OrderLogsCSV";
import { TiArrowLeftThick } from "react-icons/ti";
import { ThemeContext } from "../../App";

const OrderLogs = () => {
  const orderlogs = useSelector((state) => state.orderlogs);
  const dispatch = useDispatch();
  const tc = useContext(ThemeContext);
  useEffect(() => {
    dispatch(getOrderlogs());
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
          to="/orders"
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
        <h2>Order Logs</h2>
      </div>
      <div>
        <OrderLogsCSV orderLogsData={orderlogs} />
      </div>
      <div
        style={{
          margin: "1rem .5rem",
          marginBottom: "5rem",
        }}
        className="css9BasicGrid"
      >
        {orderlogs?.map((ol) => {
          let ts = new Date(ol.createdAt).toString();
          return (
            <div
              style={{
                border: "1px solid black",
                // overflowY: "scroll",
              }}
              className="css1Card"
              key={ol._id}
            >
              <div className="css1ContentBx">
                <div className="css9BasicGrid1">
                  <div className="tag">Invoice No.</div>
                  <div className="info">{ol?.invoice?.invoiceNo}</div>
                  <div className="tag">Operation</div>
                  <div className="info">{ol?.operation}</div>
                  <div className="tag">Timestamp</div>
                  <div className="info">
                    {new Date(ol?.createdAt).toDateString() + " "}[
                    {new Date(ol?.createdAt).toTimeString().split(" ")[0]}]
                  </div>
                </div>
              </div>

              {/* <pre>{JSON.stringify(ol, null, 2)}</pre> */}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default OrderLogs;
