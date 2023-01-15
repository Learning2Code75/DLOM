import React from "react";
import { useState, useEffect } from "react";
import { FiDelete, FiSave } from "react-icons/fi";

const OrderDeliveryEntry = ({ state, setState, index }) => {
  const [entry, setEntry] = useState({
    timeStamp: "",
    status: "",
  });
  const addEntry = (e) => {
    e.preventDefault();
    let new_order_delivery_history = [...state.orderDelivery.history];
    let curr_entry = { ...entry };
    new_order_delivery_history[index] = curr_entry;

    let new_order_delivery = { ...state.orderDelivery };
    new_order_delivery.history = new_order_delivery_history;

    setState({
      ...state,
      orderDelivery: new_order_delivery,
    });
  };
  const delEntry = (e) => {
    e.preventDefault();
    let new_state = { ...state };
    new_state.orderDelivery.history.splice(index, 1);
    setState(new_state);
  };
  useEffect(() => {
    setEntry({
      ...state.orderDelivery.history[index],
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
        placeholder="status"
        value={entry.status}
        onChange={(e) => setEntry({ ...entry, status: e.target.value })}
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

export default OrderDeliveryEntry;
