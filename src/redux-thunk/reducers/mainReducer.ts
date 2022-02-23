import { OPEN_INFO, actionType, stateType } from "../types/mainType";

const initialState: stateType = {
  info: false,
};

export function mainReducer(state = initialState, action: actionType) {
  switch (action.type) {
    case OPEN_INFO:
      // return {
      //   ...state,
      //   info: action.payload.info,
      // };
      return Object.assign({}, state, {
        info: action.payload.info,
      });
    default:
      return state;
  }
}
