import * as types from './actionTypes';
import * as Api from '../api';
import { formatSections } from '../formaters';

export function loadSectionsSuccess(sections) {
  return {
    type: types.LOAD_SECTIONS_SUCCESS,
    sections,
  };
}

export function loadSections () {
  return function(dispatch) {
    return Api.getSections().then((sections)=>{
      dispatch(loadSectionsSuccess(formatSections(sections)));
    }).catch(error => {
      throw(error);
    });
  };
}