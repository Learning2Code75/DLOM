import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";

const BillPrint = ({ data, bInvMeta }) => {
  const srRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => srRef.current,
    documentTitle: `${data.dlom_client.companyName}`,
    onAfterPrint: () => alert("Bill printed"),
  });
  const { _id, dlom_client, subscription, timestamp, payments } = data;

  return (
    <>
      <div
        style={{
          border: "1px solid lightgrey",
        }}
      >
        <h5>Bill</h5>
        <button className="btn" onClick={handlePrint}>
          Bill pdf
        </button>
        <div
          ref={srRef}
          style={{
            width: "100%",
            height: window.innerHeight,
            padding: "1rem",
          }}
        >
          <h3>Seller </h3>
          <div>{"Neel Choksi"}</div>
          <div>{"Addr"}</div>
          <div>{"GYB DLOM"}</div>

          <h3>Buyer</h3>
          <div>{dlom_client.companyName}</div>
          <div>{dlom_client.locationPin}</div>
          <div>{dlom_client.state}</div>
          <div>{dlom_client.cin}</div>
          <div>{dlom_client.gst}</div>
          <div>{dlom_client.address}</div>
          <div>{dlom_client.phone}</div>
          <div>{dlom_client.desc}</div>

          <div>{new Date(timestamp).toDateString()}</div>
          <div>Subscription</div>
          <div>
            <div>{subscription.name}</div>
            <div>{subscription.description}</div>
            <div>{subscription.cost}</div>
            <div>{subscription.costPer}</div>
            <div>{bInvMeta.totAmt}</div>
            <div>{bInvMeta.taxPercent}</div>
            <div>{bInvMeta.taxAmount}</div>
            <div>{bInvMeta.afterTaxAmount}</div>

            <div>Limits:</div>

            <div>Client Ops:{subscription.tracking.CliOps}</div>
            <div>User Ops:{subscription.tracking.UserOps}</div>
            <div>Product Ops:{subscription.tracking.ProdOps}</div>
            <div>Order Ops:{subscription.tracking.OrderOps}</div>
            <div>Task Ops:{subscription.tracking.TaskOps}</div>
          </div>
          {/* {payments.map((entry) => (
            <div
              style={{
                border: "1px solid black",
              }}
            >
              <div>{new Date(entry.timestamp).toDateString()}</div>
              <div>{new Date(entry.timestamp).toTimeString()}</div>
              <div>{entry.amount}</div>
              <div>{entry.description}</div>
              <div>{entry.mode}</div>
            </div>
          ))} */}
          {/* <div>total Amt Paid:{bMeta[0].value}</div> */}
        </div>
      </div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  );
};

export default BillPrint;
