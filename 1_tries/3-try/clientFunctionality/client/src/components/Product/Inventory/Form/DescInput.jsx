import React, { useState } from "react";

const DescInput = ({ pd, productData, setProductData, idx }) => {
  const [state, setState] = useState({
    title: pd.title,
    desc: pd.desc,
  });
  return (
    <div>
      <input
        name="prodDescTitle"
        value={state.title}
        onChange={(e) => {
          setState({ ...state, title: e.target.value });
        }}
      />
      <input
        name="prodDescDescription"
        value={state.desc}
        onChange={(e) => {
          setState({ ...state, desc: e.target.value });
        }}
      />
      <span>
        <button
          onClick={(e) => {
            e.preventDefault();
            let new_desc_arr = [...productData.prodDesc];
            new_desc_arr[idx] = state;
            new_desc_arr.push({ title: "", desc: "" });
            setProductData({ ...productData, prodDesc: new_desc_arr });
          }}
        >
          Add
        </button>
      </span>
    </div>
  );
};

export default DescInput;
