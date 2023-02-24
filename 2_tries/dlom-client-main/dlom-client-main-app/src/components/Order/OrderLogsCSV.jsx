import React from "react";
import { CSVLink } from "react-csv";
import { FaDownload } from "react-icons/fa";

const OrderLogsCSV = ({ orderLogsData }) => {
  const headers = [
    { label: "Created Date", key: "date" },
    { label: "Created Time", key: "time" },
    { label: "Salesperson", key: "order.salesperson" },
    { label: "Client", key: "order.salesOrder.invoiceTo" },
    { label: "Qty", key: "order.invoice.totalQty" },
    { label: "Amount", key: "order.invoice.totalAmount" },
    { label: "Operation", key: "operation" },
  ];

  const formatOrderlogsData = (d) => {
    let new_delivery_data = d.map((od) => ({
      ...od,
      date: new Date(od.createdAt).toDateString(),
      time: new Date(od.createdAt).toTimeString(),
    }));
    return new_delivery_data;
  };
  const data = formatOrderlogsData(orderLogsData);

  return (
    <div>
      {/* <h5>OrderlogsCSV</h5> */}

      <div className="btn1">
        <FaDownload
          style={{
            marginRight: ".4em",
          }}
        />
        <CSVLink
          data={data}
          headers={headers}
          filename={"orderlogs"}
          target="_blank"
          style={{
            color: "cyan",
            textDecoration: "none",
          }}
        >
          Orderlogs CSV
        </CSVLink>
      </div>
    </div>
  );
};

export default OrderLogsCSV;
