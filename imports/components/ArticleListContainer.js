import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Article } from '../api/collection';

import ArticleList from '../components/ArticleList';

export default ArticleListContainer = withTracker(({ sortType }) => {
    const ArticlesHandle = Meteor.subscribe('Article', sortType);
    const loading = !ArticlesHandle.ready();
    const list = Article.find({}, sortType);
    return {
        loading,
        list,
        articles: list.fetch(),
    };
})(ArticleList);