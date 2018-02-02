import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Article,User } from '../api/collection';
import {browserHistory} from 'react-router';

import ArticleList from '../components/ArticleList';

export default ArticleListContainer = withTracker(({ sortType }) => {
    const ArticlesHandle = Meteor.subscribe('Article');
    const list = Article.find({}, sortType).fetch();
    // if (browserHistory.getCurrentLocation().pathname == '/like' && Meteor.user()) {
    //         const userArticle = User.find().fetch();
    //         console.log(userArticle);

    // }
    // for (var i = 0; i < list.length; ++i) {
    //     if (list[i]._id.toString() ==)
    // }
    return {
        articles: list,
    };
})(ArticleList);