import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import DistributorCRUD from "./DistributorCRUD/DistributorCRUD";
import OrderCardCRUD from "./OrderCardCRUD/OrderCardCRUD";
import { TiArrowLeftThick } from "react-icons/ti";
import { BsFillCaretRightFill } from "react-icons/bs";
import { ThemeContext } from "../../App";

const ordersDashboardArr = [
  {
    headingBg: "01",
    heading: "Manage Orders",
    desc: "Client Manager includes client detail management functionalities",
    link: "/order",
    linkText: "Manage Orders",
    allowedUsers: ["root", "manager", "salesperson", "finance", "warehouse"],
  },
  {
    headingBg: "02",
    heading: "Order Logs",
    desc: "Client Manager includes client detail management functionalities",
    link: "/orderlogs",
    linkText: "Orderlogs",
    allowedUsers: ["root", "manager"],
  },
];
const Orders = () => {
  const { theme } = useContext(ThemeContext);
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
        <h1>Order Functionalities</h1>
      </div>
      <div className="dashboardContainer">
        {ordersDashboardArr
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
    </div>
  );
};

export default Orders;
