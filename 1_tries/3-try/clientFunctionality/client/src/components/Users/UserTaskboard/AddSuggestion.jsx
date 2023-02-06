import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateTask } from "../../../redux/actions/tasks";

const AddSuggestion = ({ user, task }) => {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    user_data: { _id: user?._id },
    description: "",
    timestamp: new Date().toISOString(),
  });

  return (
    <>
      <div>AddSuggestion</div>
      <input
        placeholder="suggestion description"
        value={state.description}
        onChange={(e) => setState({ ...state, description: e.target.value })}
      />
      <button
        onClick={(e) => {
          let new_task = { ...task };
          let new_suggestions = new_task.suggestions;
          new_suggestions.push(state);
          new_task.suggestions = new_suggestions;

          dispatch(updateTask(task._id, new_task));
          setState({
            user_data: { _id: user?._id },
            description: "",
            timestamp: new Date().toISOString(),
          });
        }}
      >
        Add Suggestion
      </button>
    </>
  );
};

export default AddSuggestion;
