import * as types from './actionTypes';

export function pageLoading(loading) {
  return {
    type: types.PAGE_LOADING,
    loading,
  };
}

export function pageLoaded(loaded) {
  return {
    type: types.PAGE_LOADED,
    loaded,
  };
}
