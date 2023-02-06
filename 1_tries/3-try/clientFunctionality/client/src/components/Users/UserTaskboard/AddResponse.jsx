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
    <>
      <div>AddResponse</div>
      <input
        placeholder="response description"
        value={state.description}
        onChange={(e) => setState({ ...state, description: e.target.value })}
      />
      <button
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
      >
        Add Response
      </button>
    </>
  );
};

export default AddResponse;
