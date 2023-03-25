import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BsFillCaretRightFill } from "react-icons/bs";
import { TiArrowLeftThick } from "react-icons/ti";
import { ThemeContext } from "../../App";
const clientDashboardArr = [
  {
    headingBg: "01",
    heading: "Manage Clients",
    desc: "Client Manager includes client detail management functionalities",
    link: "clientsCRUD",
    linkText: "Manage Clients",
    allowedUsers: ["root", "manager", "salesperson", "finance", "warehouse"],
  },
  {
    headingBg: "02",
    heading: "CRM",
    desc: "CRM includes lead generation, conversion, conversations between client and salesperson.",
    link: "clientsCRM",
    linkText: "CRM",
    allowedUsers: ["root", "manager", "salesperson"],
  },
  {
    headingBg: "03",
    heading: "Payments",
    desc: "Client Ledgers with total pending amounts, amout paid including all orders of the client.",
    link: "clientsPayments",
    linkText: "Payments",
    allowedUsers: ["root", "manager", "salesperson", "finance"],
  },
];
const Client = () => {
  const user = useSelector((state) => state?.auth?.authData?.result);
  const { theme } = useContext(ThemeContext);
  const tc = useContext(ThemeContext);

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
        <h2>Client Functionalities</h2>
      </div>

      <div className="dashboardContainer">
        {clientDashboardArr
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
      </div> */}
    </div>
  );
};

export default Client;
