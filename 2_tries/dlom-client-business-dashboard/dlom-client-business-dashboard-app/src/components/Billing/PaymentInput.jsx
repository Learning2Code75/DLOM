import React, { useState } from "react";
import { useEffect } from "react";
import { FiDelete, FiSave } from "react-icons/fi";

const PaymentInput = ({ p, idx, bill, setBill }) => {
  const [state, setState] = useState({
    amount: "",
    description: "",
    mode: "",
    timestamp: new Date().toISOString(),
  });
  useEffect(() => {
    setState(p);
  }, [p]);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* <pre>{JSON.stringify(state, null, 2)}</pre> */}

        <input
          placeholder="description"
          value={state?.description}
          onChange={(e) => {
            setState({ ...state, description: e.target.value });
          }}
          className="formControl"
        />
        <input
          placeholder="mode"
          value={state?.mode}
          onChange={(e) => {
            setState({ ...state, mode: e.target.value });
          }}
          className="formControl"
        />
        <input
          placeholder="amount"
          value={state?.amount}
          onChange={(e) => {
            setState({ ...state, amount: e.target.value });
          }}
          className="formControl"
        />
        <div
          onClick={() => {
            let new_bill = { ...bill };
            new_bill.payments[idx] = { ...state };
            setBill(new_bill);
          }}
          className="btn1"
          style={{
            margin: "0 0 0 .4em",
            padding: ".4rem 0",
            width: "20%",
          }}
        >
          <FiSave />
        </div>
        <div
          onClick={() => {
            let new_bill = { ...bill };
            new_bill.payments.splice(idx, 1);
            setBill(new_bill);
          }}
          className="btn3"
          style={{
            margin: "0 0 0 .4em",
            padding: ".4rem 0",
            width: "20%",
          }}
        >
          <FiDelete />
        </div>
      </div>
    </div>
  );
};

export default PaymentInput;
