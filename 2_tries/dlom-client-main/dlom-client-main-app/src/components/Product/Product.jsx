import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { TiArrowLeftThick } from "react-icons/ti";
import { BsFillCaretRightFill } from "react-icons/bs";
import { ThemeContext } from "../../App";

const productDashboardArr = [
  {
    headingBg: "01",
    heading: "Manage Products",
    desc: "Product Manager includes product detail management functionalities",
    link: "productsCRUD",
    linkText: "Manage Products",
    allowedUsers: ["root", "manager", "finance", "salesperson"],
  },
  {
    headingBg: "02",
    heading: "Inventory",
    desc: "Add, Reduce, Update Product Quantities, Mark product as damaged.",
    link: "productsInventory",
    linkText: "Inventory",
    allowedUsers: ["root", "manager", "finance", "warehouse"],
  },
  {
    headingBg: "03",
    heading: "Catelog",
    desc: "Generate PDF Catalog with specific stock, discount and unit rates of selected products.",
    link: "productsCatelog",
    linkText: "Catelog",
    allowedUsers: ["root", "manager", "salesperson", "finance"],
  },
  {
    headingBg: "04",
    heading: "Inventory Logs",
    desc: "Logs of Inventory operations including addition , removal, updating quantity, marking product as damaged.",
    link: "inventoryLogs",
    linkText: "Inventory Logs",
    allowedUsers: ["root", "manager"],
  },
];
const Product = () => {
  const { theme } = useContext(ThemeContext);
  const tc = useContext(ThemeContext);
  const user = useSelector((state) => state?.auth?.authData?.result);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Link
          to="/"
          className="openStylesButton1"
          style={{
            marginRight: "1rem",
            borderRadius: ".64rem",
            padding: ".6rem",
            cursor: "pointer",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: tc.theme === "light" ? "#232427" : "#ebecf0",
          }}
        >
          <TiArrowLeftThick
            style={{
              margin: "0",
              padding: "0",
            }}
          />
        </Link>
        <h2>Product Functionalities</h2>
      </div>

      <div className="dashboardContainer">
        {productDashboardArr
          .filter((da) => da.allowedUsers.includes(user?.userRole))
          .map((da) => (
            <div
              className="dashboardCard"
              style={{
                maxWidth: "9rem",
                minHeight: "13rem",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                padding: "1rem",
              }}
            >
              <div className="dashboardContent">
                <h2
                  style={{
                    position: "absolute",
                    top: "0px",
                    right: "20px",
                    fontSize: "5em",
                    color: `${
                      theme === "dark"
                        ? "rgba(255,255,255,0.05)"
                        : "rgba(0, 0, 0, 0.088)"
                    }`,
                  }}
                >
                  {da.headingBg}
                </h2>
                <h3
                  style={{
                    fontSize: "1.5em",
                    color: `${
                      theme === "dark" ? "rgba(255,255,255,0.5)" : "#777"
                    }`,
                    zIndex: "1",
                    transition: "0.5s",
                  }}
                >
                  {da.heading}
                </h3>
                <p
                  style={{
                    fontSize: "1em",
                    fontWeight: "400",
                    color: `${
                      theme === "dark" ? "rgba(255,255,255,0.5)" : "#777"
                    }`,
                    zIndex: "1",
                  }}
                >
                  {da.desc}
                </p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Link
                    to={`${da.link}`}
                    className="dashboardLink"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      position: "relative",
                      padding: ".5rem .6rem",
                      marginTop: ".5rem",
                      borderRadius: "1.2rem",
                      textDecoration: "none",
                      boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
                    }}
                  >
                    <span>{da.linkText}</span>
                    <BsFillCaretRightFill />
                  </Link>
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* <div
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
      </div> */}
    </div>
  );
};

export default Product;
