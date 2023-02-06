import { combineReducers } from "redux";
import products from "./products";
import productlogs from "./productlogs";
import orderlogs from "./orderlogs";
import auth from "./Auth";
import users from "./users";
import tasks from "./tasks";
import dlomclient from "./dlomclient";
import billing from "./billing";
export default combineReducers({
  productlogs,
  products,
  orderlogs,
  auth,
  users,
  tasks,
  dlomclient,
  billing,
});
