import React from "react";
import { useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { BsFillCaretRightFill } from "react-icons/bs";
const dashboardArr = [
  {
    headingBg: "01",
    heading: "Clients",
    desc: ` Clients module enables the distributor to create and manage client details including company name , contact person ,  address, GST number, phone number, discount rate , sales person  assigned and social media links.`,
    link: "/client",
    linkText: "Clients",
    allowedUsers: ["root", "manager", "salesperson", "finance", "warehouse"],
  },
  {
    headingBg: "02",
    heading: "Orders",
    desc: ` Clients module enables the distributor to create and manage client details including company name , contact person ,  address, GST number, phone number, discount rate , sales person  assigned and social media links.`,
    link: "/orders",
    linkText: "Orders",
    allowedUsers: ["root", "manager", "salesperson", "finance", "warehouse"],
  },
  {
    headingBg: "03",
    heading: "Products",
    desc: ` Clients module enables the distributor to create and manage client details including company name , contact person ,  address, GST number, phone number, discount rate , sales person  assigned and social media links.`,
    link: "/product",
    linkText: "Products",
    allowedUsers: ["root", "manager", "salesperson", "finance", "warehouse"],
  },
  {
    headingBg: "04",
    heading: "Users",
    desc: ` Clients module enables the distributor to create and manage client details including company name , contact person ,  address, GST number, phone number, discount rate , sales person  assigned and social media links.`,
    link: "/users",
    linkText: "Users",
    allowedUsers: ["root", "manager", "finance", "warehouse", "salesperson"],
  },
  {
    headingBg: "05",
    heading: "Analytics",
    desc: ` Clients module enables the distributor to create and manage client details including company name , contact person ,  address, GST number, phone number, discount rate , sales person  assigned and social media links.`,
    link: "/analytics",
    linkText: "Analytics",
    allowedUsers: ["root", "manager"],
  },
];
const Dashboard = () => {
  const user = useSelector((state) => state?.auth?.authData?.result);

  return (
    <div
      style={{
        // border: "2px solid cyan",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h1>Dashboard</h1>
      <div className="dashboardContainer">
        {dashboardArr
          .filter((da) => da.allowedUsers.includes(user?.userRole))
          .map((da) => (
            <div className="dashboardCard">
              <div className="dashboardBox">
                <div className="dashboardContent">
                  <h2>{da.headingBg}</h2>
                  <h3>{da.heading}</h3>
                  <p>{da.desc}</p>
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
            </div>
          ))}

        {/* <div>
          <div className="item">
            <Link to="/client">Client</Link>
          </div>
          <div className="item">
            <Link to="/order">Order</Link>
          </div>
          {(user?.userRole === "manager" || user?.userRole === "root") && (
            <div className="item">
              <Link to="/orderlogs">Order logs</Link>
            </div>
          )}

          <div className="item">
            <Link to="/product">Product</Link>
          </div>
          {(user?.userRole === "manager" || user?.userRole === "root") && (
            <div className="item">
              <Link to="/users">Users</Link>
            </div>
          )}
        </div> */}
      </div>
    </div>
  );
};

export default Dashboard;
