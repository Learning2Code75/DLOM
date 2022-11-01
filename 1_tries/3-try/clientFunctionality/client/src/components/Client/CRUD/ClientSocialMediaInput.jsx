import React, { useState } from "react";
import { FiDelete, FiSave } from "react-icons/fi";
const ClientSocialMediaInput = ({ state, setState, index }) => {
  const [cli, setCli] = useState({ title: "", link: "" });
  const addClientInput = (e) => {
    e.preventDefault();
    let new_cli_arr = { ...state };
    let new_cli_inp = { ...cli };
    new_cli_arr.clientSocialMedia[index] = new_cli_inp;
    setState(new_cli_arr);
  };
  const delClientInput = (e) => {
    e.preventDefault();
    let new_cli_arr = { ...state };
    new_cli_arr.clientSocialMedia.splice(index, 1);
    setState(new_cli_arr);
  };
  return (
    <div
      style={{
        display: "flex",
      }}
    >
      <input
        placeholder="title"
        value={cli.title}
        onChange={(e) => setCli({ ...cli, title: e.target.value })}
      />

      <input
        placeholder="link"
        value={cli.link}
        onChange={(e) => setCli({ ...cli, link: e.target.value })}
      />

      <button onClick={addClientInput}>
        <FiSave />
      </button>
      <button onClick={delClientInput}>
        <FiDelete />
      </button>
    </div>
  );
};

export default ClientSocialMediaInput;
