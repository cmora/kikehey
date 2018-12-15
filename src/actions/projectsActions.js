import * as types from './actionTypes';
import * as Api from '../api';
import { formatProjects } from '../formaters';

export function loadProjectsSuccess(projects) {
  return {
    type: types.LOAD_PROJECTS_SUCCESS,
    projects
  };
}

export function loadProjects () {
  return function(dispatch) {
    return Api.getProjects().then((projects) => {
      dispatch(loadProjectsSuccess(formatProjects(projects.items)));
    }).catch(error => {
      throw(error);
    });
  };
}