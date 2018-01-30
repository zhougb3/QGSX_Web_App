import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const ArticleList = new Mongo.Collection('articleList');

if (Meteor.isServer) {

  Meteor.publish('articleList', function articleListPublication() {
    return ArticleList.find();
  });
  
}
