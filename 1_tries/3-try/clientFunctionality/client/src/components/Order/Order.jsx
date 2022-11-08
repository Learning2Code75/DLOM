import React from "react";
import { Link } from "react-router-dom";
import DistributorCRUD from "./DistributorCRUD/DistributorCRUD";

const Order = () => {
  return (
    <div>
      <h1>Order</h1>

      <Link to="/">Go Back</Link>

      <div>
        <DistributorCRUD />
      </div>
    </div>
  );
};

export default Order;
