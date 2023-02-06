import * as api from "../../api";

export const getTasks = () => async (dispatch) => {
  try {
    const { data } = await api.fetchTasks();

    dispatch({ type: "FETCH_ALL_TASKS", payload: data });
  } catch (err) {
    console.log(err);
  }
};
export const createTask = (task) => async (dispatch, getState) => {
  try {
    const { data } = await api.createTask(task);

    dispatch({ type: "CREATE_TASK", payload: data });
  } catch (err) {
    console.log(err);
  }
};
export const updateTask = (taskId, taskData) => async (dispatch) => {
  try {
    const { data } = await api.updateTask(taskId, taskData);
    console.log(data);

    dispatch({ type: "UPDATE_TASK", payload: data });
  } catch (err) {
    console.log(err);
  }
};

// export const deleteUser = (userId) => async (dispatch) => {
//   try {
//     // console.log(userId);
//     await api.deleteUser(userId);
//     dispatch({ type: "DELETE_USER", payload: { userId } });
//   } catch (err) {}
// };
