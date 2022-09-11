import axios from "axios";

const url = "http://localhost:5000/products";

export const fetchProducts = () => axios.get(url);
export const createProduct = (newProd) => axios.post(url, newProd);
export const updateProduct = (pId, pData) =>
  axios.patch(`${url}/${pId}`, pData);

export const deleteProduct = (pId) => axios.delete(`${url}/${pId}`);
