import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Product = () => {
  const user = useSelector((state) => state?.auth?.authData?.result);

  return (
    <div>
      <h1>Product</h1>

      <div
        style={{
          display: "flex",
          background: "rgb(235,235,235",
        }}
      >
        {(user?.userRole === "manager" ||
          user?.userRole === "root" ||
          user?.userRole === "finance") && (
          <p className="item">
            <Link to="productsCRUD">Products CRUD</Link>
          </p>
        )}
        {(user?.userRole === "manager" ||
          user?.userRole === "root" ||
          user?.userRole === "finance") && (
          <p className="item">
            <Link to="productsInventory">Products Inventory</Link>
          </p>
        )}
        <p className="item">
          <Link to="productsCatelog">Products Catelog</Link>
        </p>
        {(user?.userRole === "manager" || user?.userRole === "root") && (
          <p className="item">
            <Link to="inventoryLogs">Inventory logs</Link>
          </p>
        )}
      </div>

      <Link to="/">Go Back</Link>
    </div>
  );
};

export default Product;
