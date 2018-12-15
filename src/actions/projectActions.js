import * as types from './actionTypes';
import * as Api from '../api';
import { formatProject } from '../formaters';

export function loadProjectSuccess(project) {
  return {
    type: types.LOAD_PROJECT_PAGE_SUCCESS,
    project
  };
}

export function loadProject (id) {
  return function(dispatch) {
    return Api.getProject(id).then((project) => {
      dispatch(loadProjectSuccess(formatProject(project)));
    }).catch(error => {
      throw(error);
    });
  };
}