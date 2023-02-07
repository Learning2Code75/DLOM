import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import DistributorCRUD from "./DistributorCRUD/DistributorCRUD";
import OrderCardCRUD from "./OrderCardCRUD/OrderCardCRUD";
import { TiArrowLeftThick } from "react-icons/ti";

const Order = () => {
  const user = useSelector((state) => state?.auth?.authData?.result);

  return (
    <div>
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
        <h1>Orders</h1>
      </div>

      {(user?.userRole === "manager" ||
        user?.userRole === "root" ||
        user?.userRole === "finance") && (
        <div>
          <DistributorCRUD />
        </div>
      )}

      <div>
        <OrderCardCRUD />
      </div>
    </div>
  );
};

export default Order;
