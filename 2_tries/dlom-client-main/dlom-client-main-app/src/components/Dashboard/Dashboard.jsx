import React from "react";
import { useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { BsFillCaretRightFill } from "react-icons/bs";
const dashboardArr = [
  {
    headingBg: "01",
    heading: "Clients",
    desc: ` Clients module enables the distributor to create and manage client details , CRM , payments.`,
    link: "/client",
    linkText: "Clients",
    allowedUsers: ["root", "manager", "salesperson", "finance", "warehouse"],
  },
  {
    headingBg: "02",
    heading: "Orders",
    desc: ` Orders module enables the distributor to create and manage order details , distributor details, order logs `,
    link: "/orders",
    linkText: "Orders",
    allowedUsers: ["root", "manager", "salesperson", "finance", "warehouse"],
  },
  {
    headingBg: "03",
    heading: "Products",
    desc: ` Products module enables the distributor to create and manage product details , inventory,catelog, product logs `,
    link: "/product",
    linkText: "Products",
    allowedUsers: ["root", "manager", "salesperson", "finance", "warehouse"],
  },
  {
    headingBg: "04",
    heading: "Users",
    desc: ` Users module enables the distributor to create and manage user details , taskboard , usage and pricing.`,
    link: "/users",
    linkText: "Users",
    allowedUsers: ["root", "manager", "finance", "warehouse", "salesperson"],
  },
  {
    headingBg: "05",
    heading: "Analytics",
    desc: ` Analytics module enables the manager to view the productwise sales , clientwise sales, userwise sales, transactions, client geolocation distribution , daily monthly overview of sales, sales breakdown .`,
    link: "/analytics",
    linkText: "Analytics",
    allowedUsers: ["root", "manager"],
  },
  {
    headingBg: "06",
    heading: "ML",
    desc: `ML module enables the manager to forecast order wise sales, product wise sales, client wise sales.`,
    link: "/ml",
    linkText: "ML",
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
