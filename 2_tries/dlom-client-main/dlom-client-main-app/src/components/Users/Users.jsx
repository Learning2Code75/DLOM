import React from "react";
import { Link } from "react-router-dom";

const Users = () => {
  return (
    <div>
      <h1>Users Functionalities</h1>

      <div
        style={{
          display: "flex",
          background: "rgb(235,235,235",
        }}
      >
        <p className="item">
          <Link to="userManage">Manage Users</Link>
        </p>
        <p className="item">
          <Link to="userTaskboard">User Taskboard</Link>
        </p>
        <p className="item">
          <Link to="usagePricing">Usage and Pricing</Link>
        </p>
      </div>
      <Link to="/">Go Back</Link>
    </div>
  );
};

export default Users;
