import { combineReducers } from 'redux';
import sections from './sectionsReducer';
import experience from './experienceReducer';
import projects from './projectsReducer';
import project from './projectReducer';
import social from './socialReducer';
import page from './pageReducer';

const rootReducer = combineReducers ({
    sections,
    experience,
    projects,
    project,
    social,
    page
});

export default rootReducer;
