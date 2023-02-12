import { Route, IndexRoute, Redirect } from 'react-router';
import App from './components/App';
import React from 'react';
import HomePage from './components/pages/home/HomePage';
import ProjectPage from './components/pages/project/ProjectPage';
import WorkExperiencePage from './components/pages/work-experience/WorkExperiencePage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="/projects/:projectId" component={ProjectPage} />
    <Route path="/work-experience" component={WorkExperiencePage} />
    <Route path="/404" component={HomePage} />
    <Redirect from="*" to="/" />
  </Route>
);
