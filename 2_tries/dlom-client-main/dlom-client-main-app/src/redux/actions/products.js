import { TypeOrFieldNameRegExp } from "@apollo/client/cache/inmemory/helpers";
import * as api from "../../api";

export const getProducts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchProducts();

    dispatch({ type: "FETCH_ALL", payload: data });
  } catch (err) {
    console.log(err);
  }
};

export const createProduct = (prod) => async (dispatch) => {
  try {
    const { data } = await api.createProduct(prod);
    dispatch({ type: "CREATE", payload: data });
  } catch (err) {
    console.log(err);
  }
};

export const updateProduct = (prodId, prodData) => async (dispatch) => {
  try {
    // console.log(prodId, prodData);
    const { data } = await api.updateProduct(prodId, prodData);
    // console.log(data);

    dispatch({ type: "UPDATE", payload: data });
  } catch (err) {
    console.log(err);
  }
};

export const deleteProduct = (prodId) => async (dispatch) => {
  try {
    await api.deleteProduct(prodId);
    dispatch({ type: "DELETE", payload: { prodId } });
  } catch (err) {}
};
