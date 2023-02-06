import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getOrderlogs } from "../../redux/actions/orderlogs";
import OrderLogsCSV from "./OrderLogsCSV";

const OrderLogs = () => {
  const orderlogs = useSelector((state) => state.orderlogs);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrderlogs());
  }, [dispatch]);

  return (
    <>
      <div>OrderLogs</div>
      <Link to="/">Dashboard</Link>
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
