import React from "react";
import { Link } from "react-router-dom";

const Product = () => {
  return (
    <div>
      <h1>Product</h1>

      <div
        style={{
          display: "flex",
          background: "rgb(235,235,235",
        }}
      >
        <p className="item">
          <Link to="productsCRUD">Products CRUD</Link>
        </p>
        <p className="item">
          <Link to="productsInventory">Products Inventory</Link>
        </p>
        <p className="item">
          <Link to="productsCatelog">Products Catelog</Link>
        </p>
        <p className="item">
          <Link to="inventoryLogs">Inventory logs</Link>
        </p>
      </div>

      <Link to="/">Go Back</Link>
    </div>
  );
};

export default Product;
