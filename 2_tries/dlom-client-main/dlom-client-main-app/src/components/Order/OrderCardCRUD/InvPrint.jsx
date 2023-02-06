import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";

const InvPrint = ({ data }) => {
  const invRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => invRef.current,
    documentTitle: `${data.distributorName}`,
    onAfterPrint: () => alert("Inv printed"),
  });
  const {
    distributorName,
    distributorDetails,
    invoiceNo,
    dated,
    deliveryNote,
    supplierRef,
    otherRef,
    client,
    despatchDocNo,
    deliveryNoteDate,
    despatchedThrough,
    destination,
    invTable,
    totalQty,
    totalAmount,
    amtChargableInWords,
    invTaxTable,
    totalTaxableValue,
    totalCentralTaxAmt,
    totalStateTaxAmt,
    taxAmtInWords,
    companyPAN,
    companyBankDetails,
    for: forW,
  } = data;
  return (
    <>
      <div
        style={{
          border: "1px solid lightgrey",
        }}
      >
        <h5>InvPrint</h5>
        <button className="btn" onClick={handlePrint}>
          Print Inv
        </button>

        <div
          ref={invRef}
          style={{
            width: "100%",
            height: window.innerHeight,
            padding: "1rem",
          }}
        >
          <div>{distributorName}</div>
          <div>{distributorDetails}</div>
          <div>{invoiceNo}</div>
          <div>{dated}</div>
          <div>{deliveryNote}</div>
          <div>{supplierRef}</div>
          <div>{otherRef}</div>
          <div>{client}</div>
          <div>{despatchDocNo}</div>
          <div>{deliveryNoteDate}</div>
          <div>{despatchedThrough}</div>
          <div>{destination}</div>
          {invTable.map((entry) => (
            <div
              style={{
                border: "1px solid black",
              }}
            >
              <div>{entry.descriptionOfGoods}</div>
              <div>{entry.hsnSAC}</div>
              <div>{entry.GSTRate}</div>
              <div>{entry.qty}</div>
              <div>{entry.rate}</div>
              <div>{entry.per}</div>
              <div>{entry.amount}</div>
            </div>
          ))}
          <div>{totalQty}</div>
          <div>{totalAmount}</div>
          <div>{amtChargableInWords}</div>
          {invTaxTable.map((entry) => (
            <div
              style={{
                border: "1px solid black",
              }}
            >
              <div>{entry.hsnSAC}</div>
              <div>{entry.taxableValue}</div>
              <div>{entry.centralTaxRate}</div>
              <div>{entry.centralTaxAmt}</div>
              <div>{entry.stateTaxRate}</div>
              <div>{entry.stateTaxAmt}</div>
            </div>
          ))}
          <div>{totalTaxableValue}</div>
          <div>{totalCentralTaxAmt}</div>
          <div>{totalStateTaxAmt}</div>
          <div>{taxAmtInWords}</div>
          <div>{companyPAN}</div>
          <div>{companyBankDetails.bankName}</div>
          <div>{companyBankDetails.acNo}</div>
          <div>{companyBankDetails.BranchIFSCode}</div>

          <div>{forW}</div>
        </div>
      </div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  );
};

export default InvPrint;
