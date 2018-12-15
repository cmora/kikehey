import * as types from './actionTypes';
import * as Api from '../api';
import { formatSection } from '../formaters';

export function loadAboutSectionsSuccess(section) {
  return {
    type: types.LOAD_ABOUT_SECTION_SUCCESS,
    section
  };
}

export function loadAboutSection () {
  return function(dispatch) {
    return Api.getAboutSection().then((section)=>{
      dispatch(loadAboutSectionsSuccess(formatSection(section)));
    }).catch(error => {
      throw(error);
    });
  };
}