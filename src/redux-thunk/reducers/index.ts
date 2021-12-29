import { combineReducers } from "redux";

import { langReducer } from "./langReducer";
import { navReducer } from "./navReducer";

export const rootReducer = combineReducers({
  lang: langReducer,
  nav: navReducer,
});
