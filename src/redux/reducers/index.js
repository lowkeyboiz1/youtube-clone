import { combineReducers } from "redux";

import toggleSidebarReducer from "./toggleSidebarReducer";

const allReducers = combineReducers({
  toggleSidebarReducer,
  // add more reducers here
});

export default allReducers;
