import React from "react";
import { useState, useEffect } from "react";
import { CSVLink } from "react-csv";

const PaymentCSV = ({ orderData, clientData }) => {
  const [currCli, setCurrCli] = useState({});
  const [currLedger, setCurrLedger] = useState([]);
  const [pl, setPl] = useState({
    totalAmountToPay: 0,
    paid: 0,
  });

  const headers = [
    { label: "Order id", key: "orderId" },
    { label: "Payment Date", key: "date" },
    { label: "Payment Time", key: "time" },
    { label: "Payment Method", key: "method" },
    { label: "Description", key: "description" },
    { label: "Amount", key: "amount" },
  ];

  const createLedger = (cli) => {
    let new_curr_ledger = [];
    let orders = orderData?.orders;
    let totalAmountToPay = 0;
    let paid = 0;

    for (let i = 0; i < orders.length; i++) {
      if (orders[i].client.id === cli.id) {
        if (orders[i].invoice.totalAmount) {
          totalAmountToPay =
            parseFloat(totalAmountToPay) +
            parseFloat(orders[i].invoice.totalAmount);
        }

        for (let j = 0; j < orders[i].orderPayment.history.length; j++) {
          new_curr_ledger.push({
            orderId: orders[i].id,
            date: new Date(
              orders[i].orderPayment.history[j].timeStamp
            ).toDateString(),
            time: new Date(
              orders[i].orderPayment.history[j].timeStamp
            ).toTimeString(),
            method: orders[i].orderPayment.history[j].method,
            description: orders[i].orderPayment.history[j].description,
            amount: parseFloat(orders[i].orderPayment.history[j].amount),
          });
          paid = paid + parseFloat(orders[i].orderPayment.history[j].amount);
        }
      }
    }
    console.log(new_curr_ledger);
    console.log(totalAmountToPay);
    console.log(paid);
    setCurrLedger(new_curr_ledger);
    setPl({
      totalAmountToPay,
      paid,
    });
  };

  useEffect(() => {
    console.log(orderData);
    console.log(clientData);
  }, []);
  return (
    <div>
      {/* <pre>{JSON.stringify(currCli, null, 2)}</pre> */}
      <div>
        {currCli.id && (
          <CSVLink
            data={currLedger}
            headers={headers}
            filename={"clientname"}
            target="_blank"
          >
            Download Payment Ledger CSV
          </CSVLink>
        )}

        <h2>Payment Ledger</h2>
        <div>Client :{currCli.companyName}</div>

        <div>
          <h3>Total : {pl.totalAmountToPay}</h3>
          <h3>Paid : {pl.paid}</h3>
          <h3>Balance : {pl.totalAmountToPay - pl.paid}</h3>
        </div>
        {currLedger.map((cl) => (
          <div
            style={{
              border: "1px solid lightgrey",
              borderRadius: "1rem",
              padding: "1rem",
            }}
          >
            <pre>{JSON.stringify(cl, null, 2)}</pre>
          </div>
        ))}
      </div>

      {/* <h5>Orders</h5>
      {orderData?.orders.map((pd) => (
        <div>
          <div>{pd.client.companyName}</div>
          <div>{pd.client.id}</div>
        </div>
      ))} */}
      <h2>Clients</h2>
      {clientData?.clients.map((cd) => (
        <div
          style={{
            border: "1px solid lightgrey",
            borderRadius: "1rem",
            padding: "1rem",
          }}
        >
          <div>{cd.companyName}</div>
          <div>{cd.id}</div>
          <button
            onClick={() => {
              setCurrCli(cd);
              createLedger(cd);
            }}
          >
            See Payment Ledger
          </button>
        </div>
      ))}
    </div>
  );
};

export default PaymentCSV;
