import React from "react";
import { CSVLink } from "react-csv";

const PaymentCSV = ({ paymentData }) => {
  const headers = [
    { label: "Date", key: "date" },
    { label: "Time", key: "time" },
    { label: "Method", key: "method" },
    { label: "Description", key: "description" },
    { label: "Amount", key: "amount" },
  ];

  const formatPaymentData = (d) => {
    let new_delivery_data = d.map((od) => ({
      ...od,
      date: new Date(od.timeStamp).toDateString(),
      time: new Date(od.timeStamp).toTimeString(),
    }));
    return new_delivery_data;
  };
  const data = formatPaymentData(paymentData);

  return (
    <div>
      <h5>PaymentCSV</h5>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <pre>{JSON.stringify(paymentData, null, 2)}</pre>

      <CSVLink
        data={data}
        headers={headers}
        filename={"payment_details"}
        target="_blank"
      >
        Download Payment CSV
      </CSVLink>
    </div>
  );
};

export default PaymentCSV;
