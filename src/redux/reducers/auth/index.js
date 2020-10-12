import { combineReducers } from "redux";
import { user } from "./userReducer";

const authReducers = combineReducers({
  user,
});

export default authReducers;
