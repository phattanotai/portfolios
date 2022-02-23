import { combineReducers } from "redux";

import { langReducer } from "./langReducer";
import { navReducer } from "./navReducer";
import { mainReducer } from "./mainReducer";

export const rootReducer = combineReducers({
  lang: langReducer,
  nav: navReducer,
  main: mainReducer,
});
