import axios from "axios";

const ML_API = axios.create({ baseURL: "http://localhost:5000" });

export const predArr = (ipTextArr) => ML_API.post("/predict_arr", ipTextArr);
