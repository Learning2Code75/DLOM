import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});
//products
export const fetchProducts = () => API.get("/products");
export const createProduct = (newProd) => API.post("/products", newProd);
export const updateProduct = (pId, pData) =>
  API.patch(`/products/${pId}`, pData);

export const deleteProduct = (pId) => API.delete(`/products/${pId}`);

//user
export const signIn = (fData) => API.post("/users/signin", fData);
export const signUp = (fData) => API.post("/users/signup", fData);

//inventory logs

//order logs

//user chats
