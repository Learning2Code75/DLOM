import React, { useEffect, useState } from "react";
import { FiDelete, FiSave } from "react-icons/fi";

const DescInput = ({ pd, productData, setProductData, idx }) => {
  const [state, setState] = useState({
    title: "",
    desc: "pd.desc",
  });
  const addEntry = (e) => {
    e.preventDefault();
    let new_prod_desc = [...productData.prodDesc];
    let curr_entry = { ...state };
    new_prod_desc[idx] = curr_entry;

    setProductData({
      ...productData,
      prodDesc: new_prod_desc,
    });
  };
  const delEntry = (e) => {
    e.preventDefault();
    let new_state = { ...productData };
    new_state.prodDesc.splice(idx, 1);
    setProductData(new_state);
  };
  useEffect(() => {
    setState({
      ...productData.prodDesc[idx],
    });
  }, [productData]);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <input
        name="prodDescTitle"
        placeholder="title"
        value={state.title}
        onChange={(e) => {
          setState({ ...state, title: e.target.value });
        }}
        className="formControl"
      />
      <input
        name="prodDescDescription"
        placeholder="description"
        value={state.desc}
        onChange={(e) => {
          setState({ ...state, desc: e.target.value });
        }}
        className="formControl"
      />
      {/* <button
          onClick={(e) => {
            e.preventDefault();
            let new_desc_arr = [...productData.prodDesc];
            new_desc_arr[idx] = state;
            new_desc_arr.push({ title: "", desc: "" });
            setProductData({ ...productData, prodDesc: new_desc_arr });
          }}
        >
          Add
        </button> */}
      <div
        className="btn1"
        style={{
          margin: "0 0 0 .4em",
          padding: ".4rem 0",
          width: "20%",
        }}
        onClick={addEntry}
      >
        <FiSave />
      </div>

      <div
        className="btn3"
        style={{
          margin: "0 0 0 .4em",
          padding: ".4rem 0",
          width: "20%",
        }}
        onClick={delEntry}
      >
        <FiDelete />
      </div>
    </div>
  );
};

export default DescInput;
