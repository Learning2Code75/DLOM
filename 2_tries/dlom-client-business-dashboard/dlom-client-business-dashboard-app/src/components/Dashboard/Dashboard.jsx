import React from "react";
import { Link, Navigate } from "react-router-dom";

const Dashboard = () => {
  const user = null;
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
          <Link to="/subscription">Subscriptions</Link>
        </div>
        <div className="item">
          <Link to="/dlomclient">Dlom Clients</Link>
        </div>
        <div className="item">
          <Link to="/tracking">Tracking</Link>
        </div>

        <div className="item">
          <Link to="/billing">Billing</Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
