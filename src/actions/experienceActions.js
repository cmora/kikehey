import * as types from './actionTypes';
import * as Api from '../api';
import { formatExperience } from '../formaters';

export function loadExperienceSuccess(experience) {
  return {
    type: types.LOAD_EXPERIENCE_SUCCESS,
    experience
  };
}

export function loadExperience () {
  return function(dispatch) {
    return Api.getExperience().then((experience) => {
      dispatch(loadExperienceSuccess(formatExperience(experience.items)));
    }).catch(error => {
      throw(error);
    });
  };
}