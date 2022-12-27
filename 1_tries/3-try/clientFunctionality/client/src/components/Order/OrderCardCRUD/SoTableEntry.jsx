import React, { useState } from "react";
import { useEffect } from "react";
import { FiDelete, FiSave } from "react-icons/fi";

/*
"siNo": 1,
"descriptionOfGoods": "prod1",
"dueOn": "22/12/22",
"qty": 2,
"rate": "500",
"per": "unit",
"amount": "1000"
*/

const SoTableEntry = ({ idx, soEntry, order, setOrder }) => {
  //   const [state, setState] = useState({
  //   _id: "",
  //   siNo: "",
  //   descriptionOfGoods: "",
  //   dueOn: "",
  //   qty: "",
  //   rate: "",
  //   per: "",
  //   amount: "",
  //   });
  const [state, setState] = useState({
    _id: soEntry._id,
    siNo: soEntry.siNo,
    descriptionOfGoods: soEntry.descriptionOfGoods,
    dueOn: soEntry.dueOn,
    qty: soEntry.qty,
    rate: soEntry.rate,
    per: soEntry.per,
    amount: soEntry.amount,
  });

  const saveSOTableEntry = (e) => {
    e.preventDefault();
    let curr_so_table_entry = { ...state };
    let new_order = { ...order };
    let new_soTable = new_order.salesOrder.soTable;
    new_soTable = new_soTable.map((a, index) => {
      if (index === idx) {
        return curr_so_table_entry;
      } else {
        return a;
      }
    });
    new_order.salesOrder.soTable = new_soTable;
    setOrder(new_order);
  };

  const deleteSOTableEntry = (e) => {
    e.preventDefault();
    let curr_so_table_entry = { ...state };
    let new_order = { ...order };
    let new_soTable = new_order.salesOrder.soTable;
    new_soTable = new_soTable.filter((a) => a._id !== state._id);
    new_order.salesOrder.soTable = new_soTable;
    console.log(new_order);
    setOrder(new_order);
  };

  useEffect(() => {
    return setState({ ...order.salesOrder.soTable[idx] });
  }, [order.salesOrder.soTable]);

  useEffect(() => {
    setState({
      ...state,
      amount: state.qty * state.rate,
    });
  }, [state.qty, state.rate]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <p>
        {idx + 1}
        {/* <pre>{JSON.stringify(state, null, 2)}</pre> */}
        {/* {` ${soEntry.descriptionOfGoods} ${soEntry.dueOn}  ${soEntry.qty}  ${soEntry.rate}  ${soEntry.per}  ${soEntry.amount}`} */}
      </p>
      <input
        value={state.descriptionOfGoods}
        type="text"
        placeholder="Description of Goods"
        onChange={(e) => {
          setState({ ...state, descriptionOfGoods: e.target.value });
        }}
      />
      <input
        value={state.dueOn}
        type="date"
        placeholder="Due on"
        onChange={(e) => {
          setState({ ...state, dueOn: e.target.value });
        }}
      />
      <input
        value={state.qty}
        type="number"
        placeholder="Qty"
        onChange={(e) => {
          setState({ ...state, qty: e.target.value });
        }}
      />
      <input
        value={state.rate}
        type="number"
        placeholder="Rate"
        onChange={(e) => {
          setState({ ...state, rate: e.target.value });
        }}
      />
      <select
        value={state.per}
        onChange={(e) => {
          setState({ ...state, per: e.target.value });
        }}
      >
        <option value={"unit"}>Unit</option>
      </select>
      <input
        disabled
        value={state.amount}
        type="number"
        placeholder="Amount"
        onChange={(e) => {
          setState({ ...state, amount: e.target.value });
        }}
      />
      <button onClick={saveSOTableEntry}>
        <FiSave />
      </button>
      <button onClick={deleteSOTableEntry}>
        <FiDelete />
      </button>
    </div>
  );
};

export default SoTableEntry;
