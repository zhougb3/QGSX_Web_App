import React from 'react';
import { Router, Route, browserHistory,IndexRoute } from 'react-router';

import App from '../pages/App.js';
import MainPage from '../pages/MainPage.js';
import ArticlePage from '../pages/ArticlePage.js';

import QuestionList from '../pages/QuestionList.js';
import QuestionPage from '../pages/QuestionPage.js';
import AskQuestion from '../pages/AskQuestion.js';

export const renderRoutes = () => (
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={MainPage} />
            <Route path="articlePage/:id" component={ArticlePage}/>
            <Route path="questionList" component={QuestionList}/>
        </Route>
    </Router>
);
