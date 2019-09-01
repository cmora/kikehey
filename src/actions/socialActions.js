import * as types from './actionTypes';
import * as Api from '../api';
import { formatSocial } from '../formaters';

export function loadSocialSuccess(social) {
  return {
    type: types.LOAD_SOCIAL_SUCCESS,
    social,
  };
}

export function loadSocial () {
  return function(dispatch) {
    return Api.getSocial().then((social) => {
      dispatch(loadSocialSuccess(formatSocial(social.items)));
    }).catch(error => {
      throw(error);
    });
  };
}