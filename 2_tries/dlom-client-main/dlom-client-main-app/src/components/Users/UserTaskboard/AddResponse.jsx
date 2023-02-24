import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateTask } from "../../../redux/actions/tasks";

const AddResponse = ({ user, task }) => {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    user_data: { _id: user?._id },
    description: "",
    timestamp: new Date().toISOString(),
  });

  return (
    <div className="css5Form">
      <div className="formLabel">AddResponse</div>
      <input
        placeholder="response description"
        value={state.description}
        onChange={(e) => setState({ ...state, description: e.target.value })}
        className="formControl"
      />
      <div
        onClick={(e) => {
          let new_task = { ...task };
          let new_responses = new_task.responses;
          new_responses.push(state);
          new_task.responses = new_responses;

          dispatch(updateTask(task._id, new_task));
          setState({
            user_data: { _id: user?._id },
            description: "",
            timestamp: new Date().toISOString(),
          });
        }}
        className="btn1"
        style={{
          fontSize: ".8em",
          padding: ".5em",
          margin: "0",
          marginTop: ".2rem",
        }}
      >
        Add Response
      </div>
    </div>
  );
};

export default AddResponse;
