import * as types from '../actions/actionTypes';

export default function sections(state = {}, action) {
  switch(action.type) {
    case types.LOAD_SECTIONS_SUCCESS:
      return Object.assign({}, state, action.sections);
    default:
      return state;
  }
}
 