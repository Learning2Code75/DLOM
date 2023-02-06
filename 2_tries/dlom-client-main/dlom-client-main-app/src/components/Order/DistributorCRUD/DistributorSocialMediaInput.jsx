import React, { useEffect, useState } from "react";
import { FiDelete, FiSave } from "react-icons/fi";

const DistributorSocialMediaInput = ({ state, setState, index, sm }) => {
  const [dis, setDis] = useState({ title: "", link: "" });
  useEffect(() => {
    setDis(sm);
  }, [sm]);
  const addDisInput = (e) => {
    e.preventDefault();
    let new_dis_sm = [...state.socialMedia];
    let curr_dis_sm = { ...dis };

    new_dis_sm = new_dis_sm.map((nd, idx) => {
      if (idx === index) {
        return curr_dis_sm;
      } else {
        return nd;
      }
    });
    console.log(new_dis_sm);
    setState({
      ...state,
      socialMedia: new_dis_sm,
    });
  };
  const delDisInput = (e) => {
    e.preventDefault();
    let new_dis_arr = { ...state };
    new_dis_arr.socialMedia.splice(index, 1);
    setState(new_cli_arr);
  };
  return (
    <div
      style={{
        display: "flex",
      }}
    >
      <pre>{JSON.stringify(dis, null, 2)}</pre>
      <input
        placeholder="title"
        value={dis?.title}
        onChange={(e) => setDis({ ...dis, title: e.target.value })}
      />

      <input
        placeholder="link"
        value={dis?.link}
        onChange={(e) => setDis({ ...dis, link: e.target.value })}
      />

      <button onClick={addDisInput}>
        <FiSave />
      </button>
      <button onClick={delDisInput}>
        <FiDelete />
      </button>
    </div>
  );
};

export default DistributorSocialMediaInput;
