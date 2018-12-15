import { Route, IndexRoute, Redirect } from 'react-router';
import App from './components/App';
import React from 'react';
import HomePage from './components/pages/home/HomePage';
import ProjectPage from './components/pages/project/ProjectPage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="projects/:projectId" component={ProjectPage} />
    <Route path="/404" component={HomePage} />
    <Redirect from="*" to="/" />
  </Route>
);
