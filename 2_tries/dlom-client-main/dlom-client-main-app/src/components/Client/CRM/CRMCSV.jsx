import React from "react";
import { CSVLink } from "react-csv";
import { BsDownload } from "react-icons/bs";
import { FaDownload } from "react-icons/fa";

const CRMCSV = ({ crmData, fileTitle }) => {
  const headers = [
    { label: "Timestamp", key: "timestamp" },
    { label: "Sender", key: "personType" },
    { label: "Message", key: "msg" },
  ];
  // console.log(crmData);
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
      <h4>Client , Salesperson Chats</h4>
      <div
        className="btn1"
        style={{
          display: "flex",
          justifyContent: "space-around",
          width: "45%",
          margin: ".5rem 0",
          fontWeight: "bold",
          fontSize: ".8em",
          padding: ".6em",
        }}
      >
        <BsDownload />
        <CSVLink
          data={crmData}
          headers={headers}
          filename={`${fileTitle}_chats`}
          target="_blank"
          style={{
            color: "cyan",
            textDecoration: "none",
          }}
        >
          Chats CSV
        </CSVLink>
      </div>
    </div>
  );
};

export default CRMCSV;
