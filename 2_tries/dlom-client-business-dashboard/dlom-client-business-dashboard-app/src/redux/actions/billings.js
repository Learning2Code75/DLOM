import * as api from "../../api";

export const getBillings = () => async (dispatch) => {
  try {
    const { data } = await api.fetchBillings();

    dispatch({ type: "FETCH_ALL_BILLINGS", payload: data });
  } catch (err) {
    console.log(err);
  }
};
export const createBilling = (formData) => async (dispatch) => {
  try {
    const { data } = await api.createBilling(formData);
    dispatch({ type: "CREATE_BILLING", payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const updateBilling = (bid, bdata) => async (dispatch) => {
  try {
    console.log(bid, bdata);
    const { data } = await api.updateBilling(bid, bdata);
    console.log(data);

    dispatch({ type: "UPDATE_BILLING", payload: data });
  } catch (err) {
    console.log(err);
  }
};
