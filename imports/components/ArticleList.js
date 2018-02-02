import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import {browserHistory} from 'react-router';
import {User } from '../api/collection';
import BriefArticle from '../components/BriefArticle';
import Paper from 'material-ui/Paper'

export default class ArticleList extends Component {
    renderArticleItems() {
        return this.props.articles.map((article) => {
            // console.log("List:");
            // console.log(this.props.loading);
            // console.log(this.props.list);
            // console.log(this.props.listExits);
            // if (browserHistory.getCurrentLocation().pathname == '/like' && Meteor.user()) {
            // Meteor.subscribe('UserInformation',Meteor.user().username);
            //  const userArticle = User.find().fetch();
            //  console.log(userArticle);
            // }
            return (
                <Paper key={article._id} style={{marginTop:10, marginBottom: 20,}}>
                    <BriefArticle
                        id = {article._id}
                        title={article.title}
                        date={article.date}
                        content={article.content}
                        view_count={article.view_count}
                        comment_count={article.comment_count}
                        like_count={article.like_count}
                        image_src={article.cover_image} />
                </Paper>
            )
        });
    }
    render() {
        return (
            <div>
                {this.renderArticleItems()}
            </div>
        )
    }
}