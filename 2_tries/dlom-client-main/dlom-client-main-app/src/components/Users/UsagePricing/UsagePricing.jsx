import React, { useContext, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getBilling, getDlomCli } from "../../../redux/actions/users";
import { TiArrowLeftThick } from "react-icons/ti";
import { ThemeContext } from "../../../App";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { MdExpandMore } from "react-icons/md";
import PurchaseAccordion from "./PurchaseAccordion";
import PaymentAccordion from "./PaymentAccordion";

const UsagePricing = () => {
  const dispatch = useDispatch();
  const tc = useContext(ThemeContext);
  const user = useSelector((state) => state?.auth?.authData?.result);
  const dlomclient = useSelector((state) => state?.dlomclient);
  const billing = useSelector((state) => state?.billing);

  const findOpsLeft = (done, cf, allowed) => {
    let leftOps = {
      CliOps: 0,
      UserOps: 0,
      ProdOps: 0,
      OrderOps: 0,
      TaskOps: 0,
    };

    let new_cli = allowed.CliOps + cf.CliOps - done.CliOps;
    let new_user = allowed.UserOps + cf.UserOps - done.UserOps;
    let new_prod = allowed.ProdOps + cf.ProdOps - done.ProdOps;
    let new_order = allowed.OrderOps + cf.OrderOps - done.OrderOps;
    let new_task = allowed.TaskOps + cf.TaskOps - done.TaskOps;

    leftOps = {
      CliOps: new_cli,
      UserOps: new_user,
      ProdOps: new_prod,
      OrderOps: new_order,
      TaskOps: new_task,
    };
    return leftOps;
  };
  const findPurHT = () => {
    let pur_h_t = [];
    let tax_perc = 9;
    for (let i = 0; i < billing.length; i++) {
      let tax = (parseFloat(billing[i].subscription.cost) * tax_perc) / 100;
      let a_t = parseFloat(billing[i].subscription.cost) + tax;
      pur_h_t.push({
        bill_id: billing[i]._id,
        date: new Date(billing[i].timestamp).toDateString(),
        subscription_name: billing[i].subscription.name,
        subscription_desc: billing[i].subscription.description,
        cost_bef_tax: billing[i].subscription.cost,
        tax: tax,
        cost_after_tax: a_t,
      });
    }
    return pur_h_t;
  };

  const findPayHT = () => {
    let pay_h_t = [];
    for (let i = 0; i < billing.length; i++) {
      for (let j = 0; j < billing[i]?.payments?.length; j++) {
        pay_h_t.push({
          bill_id: billing[i]._id,
          date: new Date(billing[i].payments[j].timestamp).toDateString(),
          time: new Date(billing[i].payments[j].timestamp).toTimeString(),
          description: billing[i].payments[j].description,
          mode: billing[i].payments[j].mode,
          amount: billing[i].payments[j].amount,
        });
      }
    }
    return pay_h_t;
  };

  const findBillMetas = () => {
    let bill_metas = {
      tot_amt: 0,
      tot_amt_paid: 0,
      bal: 0,
    };

    let tot_a = 0;
    let tot_a_p = 0;

    for (let i = 0; i < billing.length; i++) {
      tot_a = parseFloat(billing[i].subscription.cost) + tot_a;
      for (let j = 0; j < billing[i]?.payments?.length; j++) {
        tot_a_p = tot_a_p + parseFloat(billing[i]?.payments[j].amount);
      }
    }
    let bal = tot_a - tot_a_p;
    bill_metas = {
      tot_amt: tot_a,
      tot_amt_paid: tot_a_p,
      bal: bal,
    };
    return bill_metas;
  };

  useEffect(() => {
    dispatch(getBilling(user?.dlom_client));
    dispatch(getDlomCli(user?.dlom_client));
  }, [dispatch]);
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <Link
          to="/users"
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
        <h2>Usage and Pricing</h2>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          margin: "1rem",
        }}
      >
        <h2>Usage</h2>

        <div
          style={{
            margin: ".5rem",
            marginBottom: "5rem",
          }}
          className="css9BasicGrid"
        >
          <div className="css1Card">
            <h3
              style={{
                color: "cyan",
              }}
            >
              Current usage
            </h3>
            <div>
              <div>Client Ops : {dlomclient.tracking.CliOps}</div>
              <div>User Ops : {dlomclient.tracking.UserOps}</div>
              <div>Product Ops : {dlomclient.tracking.ProdOps}</div>
              <div>Order Ops : {dlomclient.tracking.OrderOps}</div>
              <div>Task Ops : {dlomclient.tracking.TaskOps}</div>
            </div>
            {/* <pre>{JSON.stringify(dlomclient.tracking, null, 2)}</pre> */}
          </div>

          <div className="css1Card">
            <h3
              style={{
                color: "cyan",
              }}
            >
              Quota
            </h3>
            <div>
              <div>Client Ops : {dlomclient.subscription.tracking.CliOps}</div>
              <div>User Ops : {dlomclient.subscription.tracking.UserOps}</div>
              <div>
                Product Ops : {dlomclient.subscription.tracking.ProdOps}
              </div>
              <div>Order Ops : {dlomclient.subscription.tracking.OrderOps}</div>
              <div>Task Ops : {dlomclient.subscription.tracking.TaskOps}</div>
            </div>
            {/* <pre>{JSON.stringify(dlomclient.subscription.tracking, null, 2)}</pre> */}
          </div>

          <div className="css1Card">
            <h3
              style={{
                color: "cyan",
              }}
            >
              Carry forward
            </h3>
            <div>
              <div>Client Ops : {dlomclient.carryForward.CliOps}</div>
              <div>User Ops : {dlomclient.carryForward.UserOps}</div>
              <div>Product Ops : {dlomclient.carryForward.ProdOps}</div>
              <div>Order Ops : {dlomclient.carryForward.OrderOps}</div>
              <div>Task Ops : {dlomclient.carryForward.TaskOps}</div>
            </div>
            {/* <pre>{JSON.stringify(dlomclient.carryForward, null, 2)}</pre> */}
          </div>

          <div className="css1Card">
            <h3
              style={{
                color: "cyan",
              }}
            >
              Operations left
            </h3>
            <div>
              <div>
                CliOps:
                {
                  findOpsLeft(
                    dlomclient.tracking,
                    dlomclient.carryForward,
                    dlomclient.subscription.tracking
                  ).CliOps
                }
              </div>

              <div>
                UserOps:
                {
                  findOpsLeft(
                    dlomclient.tracking,
                    dlomclient.carryForward,
                    dlomclient.subscription.tracking
                  ).UserOps
                }
              </div>
              <div>
                ProdOps:
                {
                  findOpsLeft(
                    dlomclient.tracking,
                    dlomclient.carryForward,
                    dlomclient.subscription.tracking
                  ).ProdOps
                }
              </div>
              <div>
                OrderOps:
                {
                  findOpsLeft(
                    dlomclient.tracking,
                    dlomclient.carryForward,
                    dlomclient.subscription.tracking
                  ).OrderOps
                }
              </div>
              <div>
                TaskOps:
                {
                  findOpsLeft(
                    dlomclient.tracking,
                    dlomclient.carryForward,
                    dlomclient.subscription.tracking
                  ).TaskOps
                }
              </div>
            </div>
          </div>

          {/* <pre>{JSON.stringify(dlomclient, null, 2)}</pre> */}
          {/* <pre>{JSON.stringify(billing, null, 2)}</pre> */}
        </div>
        <h2>Pricing</h2>
        <div
          style={{
            margin: ".5rem",
            marginBottom: "5rem",
          }}
          className="css9BasicGrid"
        >
          <div
            className="css1Card"
            style={{
              height: "fit-content",
            }}
          >
            <h3
              style={{
                color: "cyan",
              }}
            >
              Current plan
            </h3>
            <h4>{dlomclient.subscription.name}</h4>
            <div>
              <div>Client Ops : {dlomclient.subscription.tracking.CliOps}</div>
              <div>User Ops : {dlomclient.subscription.tracking.UserOps}</div>
              <div>
                Product Ops : {dlomclient.subscription.tracking.ProdOps}
              </div>
              <div>Order Ops : {dlomclient.subscription.tracking.OrderOps}</div>
              <div>Task Ops : {dlomclient.subscription.tracking.TaskOps}</div>
            </div>
            <div
              style={{
                fontSize: "1.2em",
                fontWeight: "bold",
              }}
            >
              ₹ {dlomclient.subscription.cost}
            </div>
            <div>
              {dlomclient.status === "active" ? (
                <span style={{ color: "cyan", fontWeight: "bold" }}>
                  {dlomclient.status}
                </span>
              ) : (
                <span>{dlomclient.status}</span>
              )}
            </div>
            <div className="tag">Description</div>
            <div className="info">{dlomclient.subscription.description}</div>
            {/* <pre>{JSON.stringify(dlomclient.subscription, null, 2)}</pre> */}
          </div>

          <div className="css1Card">
            <h3
              style={{
                color: "cyan",
              }}
            >
              Payments
            </h3>
            {/* <PurchaseAccordion data={findPurHT()} tc={tc} /> */}
            {/* <PaymentAccordion data={findPayHT()} tc={tc} /> */}
            <div
              style={{
                fontSize: "1.1em",
                fontWeight: "bold",
              }}
            >
              Purchase History
            </div>
            {findPurHT()?.map((p) => (
              <div
                className="css1Card"
                style={{
                  overflowX: "scroll",
                }}
              >
                <div className="tag">Bill ID</div>
                <div
                  className="info"
                  style={{
                    overflowX: "scroll",
                  }}
                >
                  {p.bill_id}
                </div>
                <div className="tag">Date</div>
                <div className="info">{p.date}</div>

                <div className="tag">Subscription Name</div>
                <div className="info">{p.subscription_name}</div>

                <div className="tag">Subscription Description</div>
                <div className="info">{p.subscription_desc}</div>

                <div className="tag">Cost</div>
                <div className="info">
                  <div>Before tax : {p.cost_bef_tax}</div>
                  <div>Tax :{p.tax} </div>
                  <div>After tax : {p.cost_after_tax}</div>
                </div>

                {/* {<pre>{JSON.stringify(p, null, 2)}</pre>} */}
              </div>
            ))}
            <div
              style={{
                fontSize: "1.1em",
                fontWeight: "bold",
              }}
            >
              Payments History
            </div>
            {findPayHT()?.map((p) => (
              <div
                className="css1Card"
                style={{
                  marginBottom: "1rem",
                  overflowX: "scroll",
                }}
              >
                <div>Bill ID : {p.bill_id}</div>
                <div>Date : {p.date}</div>
                <div>Time : {p.time}</div>
                <div>Description : {p.description}</div>
                <div>Mode : {p.mode}</div>
                <div style={{ fontSize: "1.1em", fontWeight: "bold" }}>
                  ₹{p.amount}
                </div>

                {/* {<pre>{JSON.stringify(p, null, 2)}</pre>} */}
              </div>
            ))}

            <div className="FlexBetween">
              <div
                style={{
                  fontWeight: "bold",
                }}
              >
                Total
                <div>₹{findBillMetas().tot_amt}</div>
              </div>

              <div
                style={{
                  color: "cyan",
                  fontWeight: "bold",
                }}
              >
                Paid <div>₹{findBillMetas().tot_amt_paid}</div>
              </div>
              <div
                style={{
                  color: "rgba(200,77,0)",
                  fontWeight: "bold",
                }}
              >
                Balance <div>₹{findBillMetas().bal}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UsagePricing;
