import { Meteor } from 'meteor/meteor';

export const User = new Mongo.Collection('User');
export const Article = new Mongo.Collection("Article");
export const Comment = new Mongo.Collection('Comment');
export const Reply = new Mongo.Collection('Reply');
export const Question = new Mongo.Collection('Question');
export const Answer = new Mongo.Collection('Answer');
export const QuestionReply = new Mongo.Collection('QuestionReply');
export const HomeSuggest = new Mongo.Collection('HomeSuggest');

Meteor.methods({
  'reply.insert'(text,from,to,articleTitle,commentId) {
    //check(text, String);
    // Make sure the user is logged in before inserting a task
    if (! this.userId || Meteor.user().username != from) {
      //console.log(Meteor.user().username);
      throw new Meteor.Error('not-authorized');
    }

    Reply.insert({
      date: new Date(),
      from:from,
      to:to,
      content:text,
      article:articleTitle,
      comment:commentId,
    });
  },

  'article.addlike'(articleTitle, like_count) {
      Article.update({'title':articleTitle},{$set:{'like_count':like_count}})
  
  },
  
  'comment.addlike'(commentId, like_count) {
      Comment.update({'_id':commentId},{$set:{'like_count':like_count}})
  },
  
  'comment.insert'(title, replyToComment, username, like_count, comment_count) {

    if (! this.userId || Meteor.user().username != username) {
      //console.log(Meteor.user().username);
      throw new Meteor.Error('not-authorized');
    }

    Comment.insert({
      date: new Date(),
      article:title,
      content:replyToComment,
      user:username,
      like_count:like_count,
    });
    
    Article.update({'title':title},{$set:{'comment_count':comment_count}})
    
  },
  
  'question.insert'(sponsor, title, description) {

    if (! this.userId || Meteor.user().username != sponsor) {
      //console.log(Meteor.user().username);
      throw new Meteor.Error('not-authorized');
    }

    Question.insert({
      sponser:sponsor,
      title:title,
      date: new Date(),
      content:description,
      answer:[],
      favorite_count:0,
      like_count:0,
      view_count:0
    });
    
  },
  
});
