export default (tasks = [], action) => {
  switch (action.type) {
    case "FETCH_ALL_TASKS":
      return action.payload;
    case "CREATE_TASK":
      return [...tasks, action.payload];
    case "UPDATE_TASK":
      return tasks.map((t) =>
        t._id === action.payload._id ? action.payload : t
      );
    case "DELETE_TASK":
      return tasks.filter((t) => t._id !== action.payload.taskId);
    default:
      return tasks;
  }
};
