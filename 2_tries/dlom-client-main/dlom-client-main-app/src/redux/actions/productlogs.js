import * as api from "../../api";

export const getProductlogs = () => async (dispatch) => {
  try {
    const { data } = await api.fetchProductlogs();

    dispatch({ type: "FETCH_ALL_PRODUCT_LOGS", payload: data });
  } catch (err) {
    console.log(err);
  }
};

export const createProductlog = (prod) => async (dispatch) => {
  try {
    const { data } = await api.createProductlog(prod);
    dispatch({ type: "CREATE_PRODUCT_LOG", payload: data });
  } catch (err) {
    console.log(err);
  }
};
