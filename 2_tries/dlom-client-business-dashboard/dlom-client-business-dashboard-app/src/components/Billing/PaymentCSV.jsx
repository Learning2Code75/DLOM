import React, { useState } from "react";
import { useEffect } from "react";
import { CSVLink } from "react-csv";

const PaymentCSV = ({ clientData, billingData }) => {
  const [currLedger, setCurrLedger] = useState([]);
  const [pl, setPl] = useState({
    totalAmountToPay: 0,
    paid: 0,
  });
  const headers = [
    { label: "Bill id", key: "billId" },
    { label: "Payment Date", key: "date" },
    { label: "Payment Time", key: "time" },
    { label: "Payment Method", key: "mode" },
    { label: "Description", key: "description" },
    { label: "Amount", key: "amount" },
  ];
  const calcLedger = () => {
    let new_ledger = [];
    for (let i = 0; i < billingData.length; i++) {
      if (billingData[i].dlom_client._id === clientData._id) {
        for (let j = 0; j < billingData[i].payments.length; j++) {
          new_ledger.push({
            billId: billingData[i]._id,
            date: new Date(billingData[i].timestamp).toDateString(),
            time: new Date(billingData[i].timestamp).toTimeString(),
            mode: billingData[i].payments[j].mode,
            description: billingData[i].payments[j].description,
            amount: billingData[i].payments[j].amount,
          });
        }
      }
    }
    console.log(clientData);
    console.log(billingData);

    setCurrLedger(new_ledger);
  };

  return (
    <div>
      {currLedger.length > 0 && (
        <div>
          <div>
            <pre>{JSON.stringify(currLedger, null, 2)}</pre>
          </div>

          <CSVLink
            data={currLedger}
            headers={headers}
            filename={"clientname"}
            target="_blank"
          >
            Download Payment Ledger CSV
          </CSVLink>
        </div>
      )}
      <button
        onClick={() => {
          calcLedger();
        }}
      >
        View Ledger
      </button>
    </div>
  );
};

export default PaymentCSV;
