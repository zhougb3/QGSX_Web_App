import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

import BriefArticle from '../components/BriefArticle';

export default class ArticleList extends Component {
    renderArticleItems() {
        return this.props.articles.map((article) => {
            // console.log("List:");
            // console.log(this.props.loading);
            // console.log(this.props.list);
            // console.log(this.props.listExits);
            return (
                <ListGroupItem key={article._id}>
                <BriefArticle 
                    title={article.title}
                    date={article.date}
                    content={article.content}
                    view_count={article.view_count}
                    comment_count={article.comment_count}
                    like_count={article.like_count}
                    image_src={article.cover_image} />
                </ListGroupItem>
            )
        });
    }
    render() {
        return (
            <ListGroup>
                {this.renderArticleItems()}
            </ListGroup>
        )
    }
}