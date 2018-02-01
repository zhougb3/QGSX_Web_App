import { Meteor } from 'meteor/meteor';
import '../imports/api/collection';

import { User, Article, Comment, Reply, Question, Answer, HomeSuggest } from '../imports/api/collection';


Meteor.publish('User', function() {
    return User.find();
});

Meteor.publish('Article', function() {
    return Article.find();
});

Meteor.publish('Comment', function() {
    return Comment.find();
});

Meteor.publish('Reply', function() {
    return Reply.find();
});

Meteor.publish('Question', function() {
    return Question.find();
});

Meteor.publish('Answer', function() {
    return Answer.find();
});

Meteor.publish('HomeSuggest', function() {
    return HomeSuggest.find();
});
