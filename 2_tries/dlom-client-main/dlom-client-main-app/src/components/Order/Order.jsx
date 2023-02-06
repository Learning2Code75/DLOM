import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import DistributorCRUD from "./DistributorCRUD/DistributorCRUD";
import OrderCardCRUD from "./OrderCardCRUD/OrderCardCRUD";

const Order = () => {
  const user = useSelector((state) => state?.auth?.authData?.result);

  return (
    <div>
      <h1>Order</h1>

      <Link to="/">Go Back</Link>

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
