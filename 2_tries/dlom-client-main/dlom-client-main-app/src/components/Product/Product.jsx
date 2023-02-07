import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { TiArrowLeftThick } from "react-icons/ti";
import { BsFillCaretRightFill } from "react-icons/bs";

const productDashboardArr = [
  {
    headingBg: "01",
    heading: "Manage Products",
    desc: "Client Manager includes client detail management functionalities",
    link: "productsCRUD",
    linkText: "Manage Products",
    allowedUsers: ["root", "manager", "finance"],
  },
  {
    headingBg: "02",
    heading: "Inventory",
    desc: "Client Manager includes client detail management functionalities",
    link: "productsInventory",
    linkText: "Inventory",
    allowedUsers: ["root", "manager", "finance"],
  },
  {
    headingBg: "03",
    heading: "Catelog",
    desc: "Client Manager includes client detail management functionalities",
    link: "productsCatelog",
    linkText: "Catelog",
    allowedUsers: ["root", "manager", "salesperson", "finance"],
  },
  {
    headingBg: "04",
    heading: "Inventory Logs",
    desc: "Client Manager includes client detail management functionalities",
    link: "inventoryLogs",
    linkText: "Inventory Logs",
    allowedUsers: ["root", "manager"],
  },
];
const Product = () => {
  const user = useSelector((state) => state?.auth?.authData?.result);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <Link
          to="/"
          className="dashboardLink"
          style={{
            marginRight: "1rem",
            fontSize: "2em",
            color: "white",
            boxShadow:
              " inset 5px 5px 5px rgba(0,0,0,0.2),inset -5px -5px 15px rgba(255,255,255,0.1), 5px 5px 15px rgba(0,0,0,0.3),  -5px -5px 15px rgba(255,255,255,0.2)",
            borderRadius: ".64rem",
            padding: ".4rem .6rem",
            cursor: "pointer",
          }}
        >
          <TiArrowLeftThick
            style={{
              margin: "0",
              padding: "0",
            }}
          />
        </Link>
        <h1>Product Functionalities</h1>
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
                    top: "-60px",
                    right: "20px",
                    fontSize: "5em",
                    color: "rgba(255,255,255,0.05)",
                  }}
                >
                  {da.headingBg}
                </h2>
                <h3
                  style={{
                    fontSize: "1.5em",
                    color: "rgba(255,255,255,0.5)",
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
                    color: "rgba(255,255,255,0.5)",
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
