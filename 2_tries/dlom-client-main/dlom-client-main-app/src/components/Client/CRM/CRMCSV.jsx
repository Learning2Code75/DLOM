import React from "react";
import { CSVLink } from "react-csv";

const CRMCSV = ({ crmData }) => {
  const headers = [
    { label: "Timestamp", key: "timestamp" },
    { label: "Sender", key: "personType" },
    { label: "Message", key: "msg" },
  ];
  console.log(crmData);
  //   const formatOrderlogsData = (d) => {
  //     let new_delivery_data = d?.map((od) => ({
  //       ...od,
  //       date: new Date(od.createdAt).toDateString(),
  //       time: new Date(od.createdAt).toTimeString(),
  //     }));
  //     return new_delivery_data;
  //   };
  //   const data = formatOrderlogsData(crmData);

  return (
    <div>
      <h5>Client , Salesperson Chats</h5>
      <CSVLink
        data={crmData}
        headers={headers}
        filename={"crm_chats"}
        target="_blank"
      >
        Download Chats CSV
      </CSVLink>
    </div>
  );
};

export default CRMCSV;
