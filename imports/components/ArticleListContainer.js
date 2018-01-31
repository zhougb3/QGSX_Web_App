import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Article } from '../api/collection';

import ArticleList from '../components/ArticleList';

export default ArticleListContainer = withTracker(({ sortType }) => {
    // const ArticlesHandle = Meteor.subscribe('Article', sortType);
    // const loading = !ArticlesHandle.ready();
    // const list = Article.findOne(id);
    // const listExists = !loading && !!list;
    // return {
    //     loading,
    //     list,
    //     listExists,
    //     articles: listExists ? list.todos().fetch() : [],
    // };

    const ArticlesHandle = Meteor.subscribe('Article', sortType);
    const loading = !ArticlesHandle.ready();
    const list = Article.find({}, sortType);
    //const listExists = !loading && !!list;
    // console.log("Container:");
    // console.log(loading);
    // console.log(list);
    //console.log(listExits);
    return {
        loading,
        list,
        //listExists,
        articles: list.fetch(),
    };
})(ArticleList);