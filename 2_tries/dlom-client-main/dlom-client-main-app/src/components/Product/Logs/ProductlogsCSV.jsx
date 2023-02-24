import React from "react";
import { CSVLink } from "react-csv";
import { FaDownload } from "react-icons/fa";

const ProductlogsCSV = ({ prodLogsData }) => {
  const headers = [
    { label: "Created Date", key: "date" },
    { label: "Created Time", key: "time" },
    { label: "Product SKU", key: "product.prodSKU" },
    { label: "Product Name", key: "product.prodName" },
    { label: "Operation", key: "operation" },
    { label: "Qty", key: "qty" },
    { label: "Damaged Description", key: "damagedDescription" },
  ];
  //   console.log(deliveryData);
  const formatDeliveryData = (d) => {
    let new_delivery_data = d.map((od) => ({
      ...od,
      date: new Date(od.createdAt).toDateString(),
      time: new Date(od.createdAt).toTimeString(),
    }));
    return new_delivery_data;
  };
  const data = formatDeliveryData(prodLogsData);

  return (
    <div>
      {/* <h5>Productlogs CSV</h5> */}
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      {/* <pre>{JSON.stringify(prodLogsData, null, 2)}</pre> */}

      <div className="btn1">
        <FaDownload
          style={{
            marginRight: ".5rem",
          }}
        />
        <CSVLink
          data={data}
          headers={headers}
          filename={"productlogs"}
          target="_blank"
          style={{
            textDecoration: "none",
            color: "cyan",
          }}
        >
          Productlogs CSV
        </CSVLink>
      </div>
    </div>
  );
};

export default ProductlogsCSV;
