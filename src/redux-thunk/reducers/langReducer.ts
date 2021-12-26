import { SET_LANG ,actionType} from '../types/langType'

const initialState = localStorage.getItem('LANG') ? String(localStorage.getItem('LANG')) : 'EN'

export function langReducer(state = initialState, action: actionType) {
  switch (action.type) {
    case SET_LANG:
      return action.payload
    default:
      return state
  }
}