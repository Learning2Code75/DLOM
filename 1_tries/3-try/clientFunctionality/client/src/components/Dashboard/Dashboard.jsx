import React from "react";
import { Link, Navigate } from "react-router-dom";

const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <div
        style={{
          background: "grey",
          width: "80vw",
          margin: "0 auto",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div className="item">
          <Link to="/client">Client</Link>
        </div>
        <div className="item">
          <Link to="/order">Order</Link>
        </div>
        <div className="item">
          <Link to="/product">Product</Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
