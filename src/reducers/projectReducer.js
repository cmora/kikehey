import * as types from '../actions/actionTypes';

export default function project(state = [], action) {
  switch(action.type) {
    case types.LOAD_PROJECT_PAGE_SUCCESS:
      return action.project;
    
    default:
      return state;
  }
}
 