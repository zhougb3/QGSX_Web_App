import React from 'react';
import { Router, Route, browserHistory,IndexRoute } from 'react-router';

import App from '../ui/App.js';
import MainPage from '../ui/MainPage.js';
import ArticlePage from '../ui/ArticlePage.js';

import QuestionList from '../ui/QuestionList.js';
import QuestionPage from '../ui/QuestionPage.js';
import AskQuestion from '../ui/AskQuestion.js';

export const renderRoutes = () => (
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={MainPage} />
            <Route path="articlePage/:id" component={ArticlePage}/>
            <Route path="questionList" component={QuestionList}/>
        </Route>
    </Router>
);
