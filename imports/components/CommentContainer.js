import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Comment, Reply } from '../api/collection';

import EachComment from '../components/Comment';

export default CommentContainer = withTracker(({ id }) => {
    const CommentHandle = Meteor.subscribe('Comment');
    const loading = !CommentHandle.ready();
    const list = Comment.find({}, sortType);
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