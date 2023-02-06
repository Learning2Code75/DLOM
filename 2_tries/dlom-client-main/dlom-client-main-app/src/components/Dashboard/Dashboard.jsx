import React from "react";
import { useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";

const Dashboard = () => {
  const user = useSelector((state) => state?.auth?.authData?.result);

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
        {(user?.userRole === "manager" || user?.userRole === "root") && (
          <div className="item">
            <Link to="/orderlogs">Order logs</Link>
          </div>
        )}

        <div className="item">
          <Link to="/product">Product</Link>
        </div>
        {(user?.userRole === "manager" || user?.userRole === "root") && (
          <div className="item">
            <Link to="/users">Users</Link>
          </div>
        )}

        {/* <div>
          {user ? (
            <div>
              <span>{user.result.name}</span>
              <button>Logout</button>
            </div>
          ) : (
            <div>
              <Link to="/auth">Login</Link>
            </div>
          )}
        </div> */}
      </div>
    </div>
  );
};

export default Dashboard;
