import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Client = () => {
  const user = useSelector((state) => state?.auth?.authData?.result);

  return (
    <div>
      <h1>Client Functionalities</h1>
      <div
        style={{
          display: "flex",
          background: "rgb(235,235,235",
        }}
      >
        <p className="item">
          <Link to="clientsCRUD">Clients CRUD</Link>
        </p>
        {(user?.userRole === "manager" ||
          user?.userRole === "root" ||
          user?.userRole === "salesperson") && (
          <p className="item">
            <Link to="clientsCRM">Clients CRM</Link>
          </p>
        )}
        {(user?.userRole === "manager" ||
          user?.userRole === "root" ||
          user?.userRole === "salesperson" ||
          user?.userRole === "finance") && (
          <p className="item">
            <Link to="clientsPayments">Client Payments</Link>
          </p>
        )}
      </div>

      <Link to="/">Go Back</Link>
    </div>
  );
};

export default Client;
