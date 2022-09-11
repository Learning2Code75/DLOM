import axios from "axios";

const url = "localhost:5000/products";

export const fetchProducts = () => axios.get(url);
