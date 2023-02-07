import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getBilling, getDlomCli } from "../../../redux/actions/users";
import { TiArrowLeftThick } from "react-icons/ti";

const UsagePricing = () => {
  const dispatch = useDispatch();
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
        <h1>Usage and Pricing</h1>
      </div>

      <div>
        <h2>Usage</h2>
        <div>
          <h3>Curr usage</h3>
          <pre>{JSON.stringify(dlomclient.tracking, null, 2)}</pre>
        </div>

        <div>
          <h3>Quota</h3>
          <pre>{JSON.stringify(dlomclient.subscription.tracking, null, 2)}</pre>
        </div>

        <div>
          <h3>Carry forward</h3>
          <pre>{JSON.stringify(dlomclient.carryForward, null, 2)}</pre>
        </div>

        <div>
          <h3>Operations left</h3>
          CliOps:
          {
            findOpsLeft(
              dlomclient.tracking,
              dlomclient.carryForward,
              dlomclient.subscription.tracking
            ).CliOps
          }
          UserOps:
          {
            findOpsLeft(
              dlomclient.tracking,
              dlomclient.carryForward,
              dlomclient.subscription.tracking
            ).UserOps
          }
          ProdOps:
          {
            findOpsLeft(
              dlomclient.tracking,
              dlomclient.carryForward,
              dlomclient.subscription.tracking
            ).ProdOps
          }
          OrderOps:
          {
            findOpsLeft(
              dlomclient.tracking,
              dlomclient.carryForward,
              dlomclient.subscription.tracking
            ).OrderOps
          }
          TaskOps:
          {
            findOpsLeft(
              dlomclient.tracking,
              dlomclient.carryForward,
              dlomclient.subscription.tracking
            ).TaskOps
          }
        </div>

        <h2>Pricing</h2>
        <div>
          <h3>Current plan</h3>
          <pre>{JSON.stringify(dlomclient.subscription, null, 2)}</pre>
        </div>

        <div>
          <h3>Payment</h3>
          <div>Purchase History Table</div>
          {findPurHT()?.map((pht) => (
            <div>
              <pre>{JSON.stringify(pht, null, 2)}</pre>
            </div>
          ))}
          <div>Payment History Table</div>
          {findPayHT()?.map((p) => (
            <div>
              <pre>{JSON.stringify(p, null, 2)}</pre>
            </div>
          ))}
          <div>Total Amount: {findBillMetas().tot_amt}</div>
          <div>Total Amount paid: {findBillMetas().tot_amt_paid}</div>
          <div>Total Amount left: {findBillMetas().bal}</div>
        </div>

        {/* <pre>{JSON.stringify(dlomclient, null, 2)}</pre> */}
        {/* <pre>{JSON.stringify(billing, null, 2)}</pre> */}
      </div>
    </>
  );
};

export default UsagePricing;
