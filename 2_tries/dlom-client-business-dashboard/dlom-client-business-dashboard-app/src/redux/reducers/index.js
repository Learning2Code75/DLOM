import { combineReducers } from "redux";
import users from "./users";
import subscriptions from "./subscriptions";
import trackings from "./trackings";
import dlomclients from "./dlomclients";
import billings from "./billings";
export default combineReducers({
  users,
  subscriptions,
  trackings,
  dlomclients,
  billings,
});
