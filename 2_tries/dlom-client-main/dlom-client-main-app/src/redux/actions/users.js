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
  } catch (err) {
    console.log(err);
  }
};
export const getDlomCli = (dcId) => async (dispatch) => {
  try {
    const { data } = await api.fetchDlomClient(dcId);
    dispatch({ type: "GET_DC", payload: data });
  } catch (err) {
    console.log(err);
  }
};
export const getBilling = (dcId) => async (dispatch) => {
  try {
    const { data } = await api.fetchBilling(dcId);
    dispatch({ type: "GET_BILLING", payload: data });
  } catch (err) {
    console.log(err);
  }
};
export const createOp = (op) => async (dispatch) => {
  try {
    console.log(op);
    const { data } = await api.createOperation(op);
    console.log(data);
  } catch (err) {
    console.log(err);
  }
};
