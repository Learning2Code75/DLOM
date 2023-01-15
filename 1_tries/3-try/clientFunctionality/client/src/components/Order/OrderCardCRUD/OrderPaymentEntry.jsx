import React from "react";
import { useState, useEffect } from "react";
import { FiDelete, FiSave } from "react-icons/fi";

const OrderPaymentEntry = ({ state, setState, index }) => {
  const [entry, setEntry] = useState({
    timeStamp: "",
    amount: "",
    method: "",
    description: "",
  });
  const addEntry = (e) => {
    e.preventDefault();
    let new_order_payment_history = [...state.orderPayment.history];
    let curr_entry = { ...entry };
    new_order_payment_history[index] = curr_entry;

    let new_order_payment = { ...state.orderPayment };
    new_order_payment.history = new_order_payment_history;

    setState({
      ...state,
      orderPayment: new_order_payment,
    });
  };
  const delEntry = (e) => {
    e.preventDefault();
    let new_state = { ...state };
    new_state.orderPayment.history.splice(index, 1);
    setState(new_state);
  };
  useEffect(() => {
    setEntry({
      ...state.orderPayment.history[index],
      timeStamp: new Date().toISOString(),
    });
  }, [state]);

  return (
    <div
      style={{
        display: "flex",
      }}
    >
      <pre>{JSON.stringify(entry, null, 2)}</pre>
      <input
        placeholder="amount"
        value={entry.amount}
        onChange={(e) => setEntry({ ...entry, amount: e.target.value })}
      />

      <input
        placeholder="method"
        value={entry.method}
        onChange={(e) => setEntry({ ...entry, method: e.target.value })}
      />

      <input
        placeholder="description"
        value={entry.description}
        onChange={(e) => setEntry({ ...entry, description: e.target.value })}
      />

      <button onClick={addEntry}>
        <FiSave />
      </button>

      <button onClick={delEntry}>
        <FiDelete />
      </button>
    </div>
  );
};

export default OrderPaymentEntry;
