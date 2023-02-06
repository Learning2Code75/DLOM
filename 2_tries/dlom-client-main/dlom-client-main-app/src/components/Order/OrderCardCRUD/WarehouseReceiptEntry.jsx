import React from "react";
import { useState, useEffect } from "react";
import { FiDelete, FiSave } from "react-icons/fi";
import FileBase from "react-file-base64";

const SoTableEntryNew = ({ state, setState, index }) => {
  const [entry, setEntry] = useState({
    imgString: "",
  });
  const addEntry = (e) => {
    e.preventDefault();

    let new_whr = [...state.wareHouseReceipt];
    let curr_entry = { ...entry };
    // upload to firebase , get image url
    let imageUrl = "";

    new_whr[index] = curr_entry;

    setState({
      ...state,
      wareHouseReceipt: new_whr,
    });
  };
  const delEntry = (e) => {
    e.preventDefault();
    let new_state = { ...state };
    new_state.wareHouseReceipt.splice(index, 1);

    setState(new_state);
  };
  useEffect(() => {
    setEntry({
      ...state.wareHouseReceipt[index],
    });
  }, [state]);

  return (
    <div
      style={{
        display: "flex",
      }}
    >
      {/* <div>
        <FileBase
          type="File"
          multiple={false}
          onDone={({ base64 }) => setEntry({ ...entry, imgString: base64 })}
        />
      </div> */}
      <div>
        <input
          type="text"
          value={entry.imgString}
          onChange={(e) => {
            setEntry({
              ...entry,
              imgString: e.target.value,
            });
          }}
        />
      </div>

      <img src={entry.imgString} height={500} width={500} />

      <button onClick={addEntry}>
        <FiSave />
      </button>

      <button onClick={delEntry}>
        <FiDelete />
      </button>
    </div>
  );
};

export default SoTableEntryNew;
