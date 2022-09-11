import * as api from "../../api";

export const getProducts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchProducts();

    const action = { type: "FETCH_ALL", payload: data };
    dispatch(action);
  } catch (err) {
    console.log(err);
  }
};
