import React from "react";
import { Link } from "react-router-dom";

const Client = () => {
  return (
    <div>
      <h1>Client</h1>
      <div
        style={{
          display: "flex",
          background: "rgb(235,235,235",
        }}
      >
        <p className="item">
          <Link to="clientsCRUD">Clients CRUD</Link>
        </p>
        <p className="item">
          <Link to="clientsCRM">Clients CRM</Link>
        </p>
        <p className="item">
          <Link to="clientsPayments">Client Payments</Link>
        </p>
      </div>

      <Link to="/">Go Back</Link>
    </div>
  );
};

export default Client;
