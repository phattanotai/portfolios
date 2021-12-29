import { OPEN_NAV, actionType } from "../types/navType";

const initialState = false;

export function navReducer(state = initialState, action: actionType) {
  switch (action.type) {
    case OPEN_NAV:
      return action.payload;
    default:
      return state;
  }
}
