import { combineReducers } from "redux";
import products from "./products";
import auth from "./Auth";
export default combineReducers({
  products,
  auth,
});
