import React from "react";

const OrderCard = ({ order }) => {
  return (
    <div
      style={{
        border: "1px solid black",
        margin: ".2rem .3rem",
        padding: ".2rem",
        maxWidth: "250px",
      }}
    >
      <h6>{order.id}</h6>
      <h5>{order.name}</h5>
      <h5>{order.status}</h5>
      <a href={`/orders/${order.id}`}>View</a>
    </div>
  );
};

export default OrderCard;
