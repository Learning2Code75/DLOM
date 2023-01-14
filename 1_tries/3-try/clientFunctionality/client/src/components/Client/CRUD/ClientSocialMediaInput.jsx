import React, { useState } from "react";
import { useEffect } from "react";
import { FiDelete, FiSave } from "react-icons/fi";
const ClientSocialMediaInput = ({ state, setState, index, isUpdate }) => {
  const [cli, setCli] = useState({ title: "", link: "" });
  useEffect(() => {
    setCli({
      ...state.clientSocialMedia[index],
    });
  }, [state]);
  const addClientInput = (e) => {
    e.preventDefault();
    let new_client_sm = [...state.clientSocialMedia];
    let curr_cli_sm = { ...cli };
    new_client_sm[index] = curr_cli_sm;
    setState({
      ...state,
      clientSocialMedia: new_client_sm,
    });
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
      <pre>{JSON.stringify(cli, null, 2)}</pre>
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
