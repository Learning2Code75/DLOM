import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";

const SoPrint = ({ data }) => {
  const soRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => soRef.current,
    documentTitle: `${data.distributorName}`,
    onAfterPrint: () => alert("SO printed"),
  });
  const {
    distributorName,
    distributorDetails,
    voucherNo,
    dated,
    modeTermsOfPayment,
    buyerRefOrderNo,
    otherRef,
    invoiceTo,
    despatchThrough,
    destination,
    termsOfDelivery,
    soTable,
    totalQty,
    totalAmt,
    amtInWords,
  } = data;
  return (
    <>
      <div
        style={{
          border: "1px solid lightgrey",
        }}
      >
        <h5>SoPrint</h5>
        <button className="btn" onClick={handlePrint}>
          Print SO
        </button>
        <div
          ref={soRef}
          style={{
            width: "100%",
            height: window.innerHeight,
            padding: "1rem",
          }}
        >
          <div>{distributorName}</div>
          <div>{distributorDetails}</div>
          <div>{voucherNo}</div>
          <div>{dated}</div>
          <div>{modeTermsOfPayment}</div>
          <div>{buyerRefOrderNo}</div>
          <div>{otherRef}</div>
          <div>{invoiceTo}</div>
          <div>{despatchThrough}</div>
          <div>{destination}</div>
          <div>{termsOfDelivery}</div>
          <div>
            {soTable.map((entry) => (
              <div
                style={{
                  border: "1px solid black",
                }}
              >
                <div>{entry.descriptionOfGoods}</div>
                <div>{entry.dueOn}</div>
                <div>{entry.qty}</div>
                <div>{entry.rate}</div>
                <div>{entry.per}</div>
                <div>{entry.amount}</div>
              </div>
            ))}
          </div>
          <div>{totalQty}</div>
          <div>{totalAmt}</div>
          <div>{amtInWords}</div>
        </div>
      </div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  );
};

export default SoPrint;
