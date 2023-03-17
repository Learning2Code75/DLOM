import React from "react";
import { Link, Navigate } from "react-router-dom";
import { BsFillCaretRightFill } from "react-icons/bs";

const Dashboard = () => {
  const user = null;
  return (
    <div>
      {/* <h1>Dashboard</h1> */}
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
          <div className="dashboardCard">
            <div className="dashboardBox">
              <div className="dashboardContent">
                <h2>01</h2>
                <h3>Subscriptions</h3>
                <p>
                  Subscription plan customized for the dlom client according to
                  the needs in various areas of the application.
                </p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Link
                    to={`/subscription`}
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
                    <span>Subscriptions</span>
                    <BsFillCaretRightFill />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="dashboardCard">
            <div className="dashboardBox">
              <div className="dashboardContent">
                <h2>02</h2>
                <h3>Dlom Clients</h3>
                <p>
                  Clients made for organization, each user associated with the
                  dlom client id to track operations, manage billings,
                  subscriptions.
                </p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Link
                    to={`/dlomclient`}
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
                    <span>Dlom Clients</span>
                    <BsFillCaretRightFill />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="dashboardCard">
            <div className="dashboardBox">
              <div className="dashboardContent">
                <h2>03</h2>
                <h3>Tracking</h3>
                <p>
                  Operations done by the users in dufferent areas of the
                  application .
                </p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Link
                    to={`/tracking`}
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
                    <span>Tracking</span>
                    <BsFillCaretRightFill />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="dashboardCard">
            <div className="dashboardBox">
              <div className="dashboardContent">
                <h2>04</h2>
                <h3>Billing</h3>
                <p>
                  Billing entries generated when a Dlom Client is assigned to a
                  subscription plan. Download pdf , view client wise bills.
                  ledgers, manage payments
                </p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Link
                    to={`/billing`}
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
                    <span>Billing</span>
                    <BsFillCaretRightFill />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="dashboardCard">
            <div className="dashboardBox">
              <div className="dashboardContent">
                <h2>05</h2>
                <h3>Analytics</h3>
                <p>
                  Analytics module enabling the user to see sales overview,
                  breakdown , monthly sales , client geography , subscription
                  wise sales , transactions, client wise sales, client wise
                  trackings
                </p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Link
                    to={`/analytics`}
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
                    <span>Analytics</span>
                    <BsFillCaretRightFill />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
