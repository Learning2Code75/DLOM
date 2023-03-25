import React from "react";
import { CSVLink } from "react-csv";
import { FaDownload } from "react-icons/fa";

const PaymentCSV = ({ paymentData, id }) => {
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
      {/* <h5>PaymentCSV</h5> */}
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      {/* <pre>{JSON.stringify(paymentData, null, 2)}</pre> */}
      <div className="btn1">
        <FaDownload
          style={{
            marginRight: ".4rem",
          }}
        />
        <CSVLink
          data={data}
          headers={headers}
          filename={`${id}_${"payment_details"}`}
          target="_blank"
          style={{
            textDecoration: "none",
            color: "cyan",
          }}
        >
          Payment CSV
        </CSVLink>
      </div>
    </div>
  );
};

export default PaymentCSV;
