import React from "react";
import { CSVLink } from "react-csv";
import { FaDownload } from "react-icons/fa";

const DeliveryCSV = ({ deliveryData, id }) => {
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
      <h5>Delivery CSV</h5>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      {/* <pre>{JSON.stringify(deliveryData, null, 2)}</pre> */}
      <div className="btn1">
        <FaDownload
          style={{
            marginRight: ".4rem",
          }}
        />

        <CSVLink
          data={data}
          headers={headers}
          filename={`${id}_${"delivery_details"}`}
          target="_blank"
          style={{
            textDecoration: "none",
            color: "cyan",
          }}
        >
          Delivery CSV
        </CSVLink>
      </div>
    </div>
  );
};

export default DeliveryCSV;
