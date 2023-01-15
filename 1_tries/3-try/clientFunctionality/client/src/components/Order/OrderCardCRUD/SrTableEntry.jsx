import React from "react";
import { useState, useEffect } from "react";
import { FiDelete, FiSave } from "react-icons/fi";

const SrTableEntry = ({ state, setState, index }) => {
  const [entry, setEntry] = useState({
    qty: 0,
    details: "",
    price: "",
    amount: "",
  });
  const addEntry = (e) => {
    e.preventDefault();
    let new_sr_table = [...state.salesReceipt.srTable];
    let curr_entry = { ...entry };
    new_sr_table[index] = curr_entry;

    let new_sales_receipt = { ...state.salesReceipt };
    new_sales_receipt.srTable = new_sr_table;

    setState({
      ...state,
      salesReceipt: new_sales_receipt,
    });
  };
  const delEntry = (e) => {
    e.preventDefault();
    let new_state = { ...state };
    new_state.salesReceipt.srTable.splice(index, 1);

    setState(new_state);
  };
  useEffect(() => {
    setEntry({
      ...state.salesReceipt.srTable[index],
    });
  }, [state]);

  useEffect(() => {
    let new_amount = 0;
    new_amount = parseInt(entry.qty) * parseFloat(entry.price);
    setEntry({ ...entry, amount: new_amount.toString() });
  }, [entry.qty, entry.price]);

  return (
    <div
      style={{
        display: "flex",
      }}
    >
      <pre>{JSON.stringify(entry, null, 2)}</pre>
      <input
        placeholder="details"
        value={entry.details}
        onChange={(e) => setEntry({ ...entry, details: e.target.value })}
      />

      <input
        type="number"
        placeholder="qty"
        value={entry.qty}
        onChange={(e) => setEntry({ ...entry, qty: parseInt(e.target.value) })}
      />
      <input
        placeholder="price"
        value={entry.price}
        onChange={(e) => setEntry({ ...entry, price: e.target.value })}
      />

      <input
        placeholder="amount"
        value={entry.amount}
        onChange={(e) => setEntry({ ...entry, amount: e.target.value })}
        disabled={true}
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

export default SrTableEntry;
