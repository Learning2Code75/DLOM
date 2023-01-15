import * as api from "../../api";

export const getOrderlogs = () => async (dispatch) => {
  try {
    const { data } = await api.fetchOrderlogs();

    dispatch({ type: "FETCH_ALL_ORDER_LOGS", payload: data });
  } catch (err) {
    console.log(err);
  }
};

export const createOrderlog = (ord) => async (dispatch) => {
  try {
    const { data } = await api.createOrderlog(ord);
    dispatch({ type: "CREATE_ORDER_LOG", payload: data });
  } catch (err) {
    console.log(err);
  }
};
