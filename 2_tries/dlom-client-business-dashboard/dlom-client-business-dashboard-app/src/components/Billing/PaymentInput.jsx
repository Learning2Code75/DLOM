import React, { useState } from "react";
import { useEffect } from "react";

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
        }}
      >
        <pre>{JSON.stringify(state, null, 2)}</pre>

        <input
          placeholder="description"
          value={state?.description}
          onChange={(e) => {
            setState({ ...state, description: e.target.value });
          }}
        />
        <input
          placeholder="mode"
          value={state?.mode}
          onChange={(e) => {
            setState({ ...state, mode: e.target.value });
          }}
        />
        <input
          placeholder="amount"
          value={state?.amount}
          onChange={(e) => {
            setState({ ...state, amount: e.target.value });
          }}
        />
        <div>
          <button
            onClick={() => {
              let new_bill = { ...bill };
              new_bill.payments[idx] = { ...state };
              setBill(new_bill);
            }}
          >
            Save
          </button>
          <button
            onClick={() => {
              let new_bill = { ...bill };
              new_bill.payments.splice(idx, 1);
              setBill(new_bill);
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentInput;
