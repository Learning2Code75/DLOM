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
    <div className="css5Form">
      <div className="formLabel">Add Suggestion</div>
      <input
        placeholder="suggestion description"
        value={state.description}
        onChange={(e) => setState({ ...state, description: e.target.value })}
        className="formControl"
      />
      <div
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
        className="btn1"
        style={{
          fontSize: ".8em",
          padding: ".5em",
          margin: "0",
          marginTop: ".2rem",
        }}
      >
        Add Suggestion
      </div>
    </div>
  );
};

export default AddSuggestion;
