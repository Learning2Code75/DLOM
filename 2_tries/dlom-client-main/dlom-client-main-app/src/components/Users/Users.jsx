import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { TiArrowLeftThick } from "react-icons/ti";
import { BsFillCaretRightFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import { ThemeContext } from "../../App";

const userDashboardArr = [
  {
    headingBg: "01",
    heading: "Manage Users",
    desc: "Client Manager includes client detail management functionalities",
    link: "userManage",
    linkText: "Manage Users",
    allowedUsers: ["root", "manager"],
  },
  {
    headingBg: "02",
    heading: "User Taskboard",
    desc: "Client Manager includes client detail management functionalities",
    link: "userTaskboard",
    linkText: "User Taskboard",
    allowedUsers: ["root", "manager", "salesperson", "finance", "warehouse"],
  },
  {
    headingBg: "03",
    heading: "Usage and Pricing",
    desc: "Client Manager includes client detail management functionalities",
    link: "usagePricing",
    linkText: "Usage and Pricing",
    allowedUsers: ["root", "manager"],
  },
];
const Users = () => {
  const { theme } = useContext(ThemeContext);
  const user = useSelector((state) => state?.auth?.authData?.result);
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
        <h2>User Functionalities</h2>
      </div>
      <div className="dashboardContainer">
        {userDashboardArr
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
          <Link to="userManage">Manage Users</Link>
        </p>
        <p className="item">
          <Link to="userTaskboard">User Taskboard</Link>
        </p>
        <p className="item">
          <Link to="usagePricing">Usage and Pricing</Link>
        </p>
      </div> */}
    </div>
  );
};

export default Users;
