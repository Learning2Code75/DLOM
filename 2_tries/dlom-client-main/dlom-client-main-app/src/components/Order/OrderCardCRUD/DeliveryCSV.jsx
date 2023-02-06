import React from "react";
import { CSVLink } from "react-csv";

const DeliveryCSV = ({ deliveryData }) => {
  const headers = [
    { label: "Date", key: "date" },
    { label: "Time", key: "time" },
    { label: "Status", key: "status" },
  ];
  //   console.log(deliveryData);
  const formatDeliveryData = (d) => {
    let new_delivery_data = d.map((od) => ({
      ...od,
      date: new Date(od.timeStamp).toDateString(),
      time: new Date(od.timeStamp).toTimeString(),
    }));
    return new_delivery_data;
  };
  const data = formatDeliveryData(deliveryData);

  return (
    <div>
      <h5>DeliveryCSV</h5>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <pre>{JSON.stringify(deliveryData, null, 2)}</pre>

      <CSVLink
        data={data}
        headers={headers}
        filename={"delivery_details"}
        target="_blank"
      >
        Download Delivery CSV
      </CSVLink>
    </div>
  );
};

export default DeliveryCSV;
