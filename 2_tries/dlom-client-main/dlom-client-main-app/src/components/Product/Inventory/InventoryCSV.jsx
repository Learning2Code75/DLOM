import React from "react";
import { CSVLink } from "react-csv";
import { FaDownload } from "react-icons/fa";

const InventoryCSV = ({ invData }) => {
  const processProducts = () => {
    const formattedData = invData?.map((p) => ({
      prodSKU: p.prodSKU,
      prodName: p.prodName,
      prodUnitRate: p.productUnitRate,
      prodTax: p.prodTax,
      prodQty: p.qty,
      prodCat: p.category,
      prodDicount: p.discount,
      prodCreatedDate: new Date(p.createdAt).toDateString(),
      prodCreatedTime: new Date(p.createdAt).toTimeString(),
      prodDamaged: p.damaged,
      prodDamagedDesc: p.damagedDescription,
    }));
    return formattedData;
  };
  const processedProducts = processProducts();
  const headers = [
    { label: "SKU", key: "prodSKU" },
    { label: "Name", key: "prodName" },
    { label: "Unit Rate", key: "prodUnitRate" },
    { label: "Tax", key: "prodTax" },
    { label: "Qty", key: "prodQty" },
    { label: "Category", key: "prodCat" },
    { label: "Discount", key: "prodDicount" },
    { label: "Created Date", key: "prodCreatedDate" },
    { label: "Created Time", key: "prodCreatedTime" },
    { label: "Damaged State", key: "prodDamaged" },
    { label: "Damaged Description", key: "prodDamagedDesc" },
  ];
  return (
    <div>
      <div className="openStylesButton1">
        <FaDownload
          style={{
            marginRight: ".4rem",
          }}
        />
        <CSVLink
          data={processedProducts}
          headers={headers}
          filename={`products_inventory`}
          target="_blank"
          style={{
            textDecoration: "none",
            color: "cyan",
          }}
        >
          Inventory CSV
        </CSVLink>
      </div>
    </div>
  );
};

export default InventoryCSV;
