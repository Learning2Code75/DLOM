import * as api from "../../api";

export const getUsers = () => async (dispatch) => {
  try {
    const { data } = await api.fetchUsers();

    dispatch({ type: "FETCH_ALL_USERS", payload: data });
  } catch (err) {
    console.log(err);
  }
};

export const updateUser = (userId, userData) => async (dispatch) => {
  try {
    console.log(userId, userData);
    const { data } = await api.updateUser(userId, userData);
    console.log(data);

    dispatch({ type: "UPDATE_USER", payload: data });
  } catch (err) {
    console.log(err);
  }
};

export const deleteUser = (userId) => async (dispatch) => {
  try {
    // console.log(userId);
    await api.deleteUser(userId);
    dispatch({ type: "DELETE_USER", payload: { userId } });
  } catch (err) {}
};
