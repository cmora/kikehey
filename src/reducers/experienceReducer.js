import * as types from '../actions/actionTypes';

export default function experience(state = [], action) {
  switch(action.type) {
    case types.LOAD_EXPERIENCE_SUCCESS:
      return action.experience;
    
    default:
      return state;
  }
}
 