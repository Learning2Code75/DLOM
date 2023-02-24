import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import DistributorCRUD from "./DistributorCRUD/DistributorCRUD";
import OrderCardCRUD from "./OrderCardCRUD/OrderCardCRUD";
import { TiArrowLeftThick } from "react-icons/ti";
import { ThemeContext } from "../../App";

const Order = () => {
  const tc = useContext(ThemeContext);
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
        <h2>Orders</h2>
      </div>

      {/* {(user?.userRole === "manager" ||
        user?.userRole === "root" ||
        user?.userRole === "finance") && (
        <div>
          <DistributorCRUD />
        </div>
      )} */}

      <div>
        <OrderCardCRUD />
      </div>
    </div>
  );
};

export default Order;
