import * as types from '../actions/actionTypes';

export default function sections(state = [], action) {
  switch(action.type) {
    case types.LOAD_ABOUT_SECTION_SUCCESS:
      return [
        ...state,
        Object.assign({}, action.section)
      ];
    
    default:
      return state;
  }
}
 