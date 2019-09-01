import * as types from '../actions/actionTypes';

const initialState = {
  loading: false,
  loaded: true,
};

export default function page(state = initialState, action) {
  switch(action.type) {
    case types.PAGE_LOADING:
      return Object.assign({}, state, {
        loading: action.loading,
        loaded: true,
      });
    case types.PAGE_LOADED:
      return Object.assign({}, state, {
        loaded: action.loaded,
        loading: false,
      });
    default:
      return state;
  }
}
 