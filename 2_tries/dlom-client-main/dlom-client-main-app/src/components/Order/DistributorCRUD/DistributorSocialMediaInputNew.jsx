import React, { useState } from "react";
import { useEffect } from "react";
import { FiDelete, FiSave } from "react-icons/fi";

const DistributorSocialMediaInputNew = ({ state, setState, index }) => {
  const [dis, setDis] = useState({ title: "", link: "" });

  const addDisInput = (e) => {
    e.preventDefault();
    let new_sm = [...state.socialMedia];
    let curr_dis = { ...dis };
    new_sm[index] = curr_dis;

    setState({
      ...state,
      socialMedia: new_sm,
    });
  };
  const delDisInput = (e) => {
    e.preventDefault();
    let new_state = { ...state };
    new_state.socialMedia.splice(index, 1);
    setState(new_state);
  };

  useEffect(() => {
    setDis({
      ...state.socialMedia[index],
    });
  }, [state]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* <pre>{JSON.stringify(dis, null, 2)}</pre> */}
      <input
        placeholder="title"
        value={dis.title}
        onChange={(e) => setDis({ ...dis, title: e.target.value })}
        className="formControl"
      />

      <input
        placeholder="link"
        value={dis.link}
        onChange={(e) => setDis({ ...dis, link: e.target.value })}
        className="formControl"
      />

      <button
        onClick={addDisInput}
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
        onClick={delDisInput}
        className="btn3"
        style={{
          margin: "0 0 0 .4em",
          padding: ".4rem 0",
          width: "20%",
        }}
      >
        <FiDelete />
      </button>
    </div>
  );
};

export default DistributorSocialMediaInputNew;
