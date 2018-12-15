import * as types from '../actions/actionTypes';

export default function social(state = [], action) {
  switch(action.type) {
    case types.LOAD_SOCIAL_SUCCESS:
      return action.social;
    
    default:
      return state;
  }
}
 