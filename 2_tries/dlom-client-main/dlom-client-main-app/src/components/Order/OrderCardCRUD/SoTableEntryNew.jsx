import React from "react";
import { useState, useEffect } from "react";
import { FiDelete, FiSave } from "react-icons/fi";

const SoTableEntryNew = ({
  state,
  setState,
  index,
  soTableEntry,
  calcSalesOrderFields,
}) => {
  const [entry, setEntry] = useState({
    siNo: 0,
    descriptionOfGoods: "",
    dueOn: "",
    qty: 0,
    rate: "",
    per: "unit",
    amount: "",
  });
  const addEntry = (e) => {
    e.preventDefault();
    let new_so_table = [...state.salesOrder.soTable];
    let curr_entry = { ...entry };
    new_so_table[index] = curr_entry;

    let new_sales_order = { ...state.salesOrder };
    new_sales_order.soTable = new_so_table;
    let so_fields = calcSalesOrderFields(new_so_table);
    new_sales_order.totalQty = so_fields.totalQty;
    new_sales_order.totalAmt = so_fields.totalAmt.toString();
    new_sales_order.amtInWords = so_fields.amtInWords;

    setState({
      ...state,
      salesOrder: new_sales_order,
    });
  };
  const delEntry = (e) => {
    e.preventDefault();
    let new_state = { ...state };
    new_state.salesOrder.soTable.splice(index, 1);
    let so_fields = calcSalesOrderFields(new_state.salesOrder.soTable);
    new_state.salesOrder.totalQty = so_fields.totalQty;
    new_state.salesOrder.totalAmt = so_fields.totalAmt.toString();
    new_state.salesOrder.amtInWords = so_fields.amtInWords;

    setState(new_state);
  };
  useEffect(() => {
    setEntry({
      ...state.salesOrder.soTable[index],
    });
  }, [state]);

  useEffect(() => {
    let new_amount = 0;
    new_amount = parseInt(entry.qty) * parseFloat(entry.rate);
    setEntry({ ...entry, amount: new_amount.toString() });
  }, [entry.qty, entry.rate]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* <pre>{JSON.stringify(entry, null, 2)}</pre> */}
      <input
        placeholder="descn of goods"
        value={entry.descriptionOfGoods}
        onChange={(e) =>
          setEntry({ ...entry, descriptionOfGoods: e.target.value })
        }
        className="formControl"
      />

      <input
        type="date"
        value={entry.dueOn}
        onChange={(e) => setEntry({ ...entry, dueOn: e.target.value })}
        className="formControl"
      />

      <input
        type="number"
        placeholder="qty"
        value={entry.qty}
        onChange={(e) => setEntry({ ...entry, qty: parseInt(e.target.value) })}
        className="formControl"
      />
      <input
        placeholder="rate"
        value={entry.rate}
        onChange={(e) => setEntry({ ...entry, rate: e.target.value })}
        className="formControl"
      />

      {/* <select
        value={entry.per}
        onChange={(e) => setEntry({ ...entry, per: e.target.value })}
      >
        <option value={"unit"}>unit</option>
      </select> */}

      <input
        value={entry.per}
        disabled={true}
        className="formControl"
        placeholder="per"
      />

      <input
        placeholder="amount"
        value={entry.amount}
        onChange={(e) => setEntry({ ...entry, amount: e.target.value })}
        disabled={true}
        className="formControl"
      />

      <button
        onClick={addEntry}
        className="btn1"
        style={{
          margin: "0 0 0 .4em",
          padding: ".4rem 0",
          width: "20%",
        }}
      >
        <FiSave />
      </button>

      <button
        className="btn3"
        style={{
          margin: "0 0 0 .4em",
          padding: ".4rem 0",
          width: "20%",
        }}
        onClick={delEntry}
      >
        <FiDelete />
      </button>
    </div>
  );
};

export default SoTableEntryNew;
