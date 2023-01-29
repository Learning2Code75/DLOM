import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";

const SrPrint = ({ data }) => {
  const srRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => srRef.current,
    documentTitle: `${data.distributorName}`,
    onAfterPrint: () => alert("Sr printed"),
  });
  const {
    distributorName,
    distributorDetails,
    soldBy,
    date,
    name,
    address,
    mode,
    srTable,
  } = data;
  return (
    <>
      <div
        style={{
          border: "1px solid lightgrey",
        }}
      >
        <h5>SrPrint</h5>
        <button className="btn" onClick={handlePrint}>
          Print Sr
        </button>
        <div
          ref={srRef}
          style={{
            width: "100%",
            height: window.innerHeight,
            padding: "1rem",
          }}
        >
          <div>{distributorName}</div>
          <div>{distributorDetails}</div>
          <div>{soldBy}</div>
          <div>{date}</div>
          <div>{name}</div>
          <div>{address}</div>
          <div>{mode}</div>
          {srTable.map((entry) => (
            <div
              style={{
                border: "1px solid black",
              }}
            >
              <div>{entry.qty}</div>
              <div>{entry.details}</div>
              <div>{entry.price}</div>
              <div>{entry.amount}</div>
            </div>
          ))}
        </div>
      </div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  );
};

export default SrPrint;
