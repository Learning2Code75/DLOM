import * as api from "../../api";

export const getDlomClients = () => async (dispatch) => {
  try {
    const { data } = await api.fetchDlomClients();

    dispatch({ type: "FETCH_ALL_DLOMCLIENTS", payload: data });
  } catch (err) {
    console.log(err);
  }
};
export const createDlomClient = (formData) => async (dispatch) => {
  try {
    const { data } = await api.createDlomClient(formData);
    dispatch({ type: "CREATE_DLOMCLIENT", payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const updateDlomClient = (dcId, dcData) => async (dispatch) => {
  try {
    const { data } = await api.updateDlomClient(dcId, dcData);
    // console.log(data);

    dispatch({ type: "UPDATE_DLOMCLIENT", payload: data });
  } catch (err) {
    console.log(err);
  }
};

export const deleteDlomClient = (dcId) => async (dispatch) => {
  try {
    // console.log(userId);
    await api.deleteDlomClient(dcId);
    dispatch({ type: "DELETE_DLOMCLIENT", payload: { dcId } });
  } catch (err) {}
};
