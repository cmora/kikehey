/*eslint-disable import/default */
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import configureStore from './store/configureStore';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { loadSections } from './actions/sectionsActions';
import { loadExperience } from './actions/experienceActions';
import { loadProjects } from './actions/projectsActions';
import { loadSocial } from './actions/socialActions';
import routes from './routes';
import './assets/styles/main.scss';

const store = configureStore();
store.dispatch(loadSections());
store.dispatch(loadExperience());
store.dispatch(loadProjects());
store.dispatch(loadSocial());

render(
    <Provider store={store}>
        <Router history={browserHistory} routes={routes}/>
    </Provider>,
    document.getElementById('app')
);