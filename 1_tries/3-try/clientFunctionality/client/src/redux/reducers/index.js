import { combineReducers } from "redux";
import products from "./products";
import productlogs from "./productlogs";
import auth from "./Auth";
export default combineReducers({
  productlogs,
  products,
  auth,
});
