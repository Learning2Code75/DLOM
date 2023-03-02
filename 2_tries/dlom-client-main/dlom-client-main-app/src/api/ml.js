import axios from "axios";

const ML_API = axios.create({ baseURL: "http://localhost:5000" });

export const predArr = (ipTextArr) => ML_API.post("/predict_arr", ipTextArr);
export const predM1 = (payload) =>
  ML_API.post("/predict_orderwise_reg", payload);
export const predM2 = (payload) =>
  ML_API.post("/predict_prodwise_reg", payload);
export const predM3 = (payload) =>
  ML_API.post("/predict_prodwise_client_classif", payload);
export const predM4 = (payload) =>
  ML_API.post("/predict_prodwise_product_classif", payload);
export const predM5 = (payload) =>
  ML_API.post("/predict_clientwise_reg", payload);
