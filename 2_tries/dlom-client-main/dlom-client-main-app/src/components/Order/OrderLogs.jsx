import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getOrderlogs } from "../../redux/actions/orderlogs";
import OrderLogsCSV from "./OrderLogsCSV";
import { TiArrowLeftThick } from "react-icons/ti";

const OrderLogs = () => {
  const orderlogs = useSelector((state) => state.orderlogs);
  const dispatch = useDispatch();

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
        <h1>Order Logs</h1>
      </div>
      <div>
        <OrderLogsCSV orderLogsData={orderlogs} />
      </div>
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
        {orderlogs?.map((ol) => {
          let ts = new Date(ol.createdAt).toString();
          return (
            <div
              style={{
                border: "1px solid black",
                overflowY: "scroll",
              }}
              key={ol._id}
            >
              <pre>{JSON.stringify(ol, null, 2)}</pre>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default OrderLogs;
