import { Meteor } from 'meteor/meteor';

export const User = new Mongo.Collection('User');
export const Article = new Mongo.Collection("Article");
export const Comment = new Mongo.Collection('Comment');
export const Reply = new Mongo.Collection('Reply');
export const Question = new Mongo.Collection('Question');
export const Answer = new Mongo.Collection('Answer');
export const HomeSuggest = new Mongo.Collection('HomeSuggest');