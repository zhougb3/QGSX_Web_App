import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { ListGroup, ListGroupItem, Carousel, Image } from 'react-bootstrap';
import { Link } from 'react-router';

import { Article, HomeSuggest } from '../api/collection';
import BriefArticle from '../components/BriefArticle';

class MainPage extends Component {
    renderCarouselItems() {
        return this.props.homeSuggests.map((suggest) => {
            return (
                <Carousel.Item key={suggest._id}>
                    <a href={suggest.route}><Image src={suggest.image}responsive/></a>
                    {/* <Carousel.Caption>
                        <h3>First slide label</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption> */}
                </Carousel.Item>
            )
        });
    }
    renderArticleList() {
        return this.props.articles.map((article) => {
            return (
                <ListGroupItem key={article._id}>
                <BriefArticle 
                    title={article.title}
                    date={article.date}
                    content={article.content}
                    view_count={article.view_count}
                    comment_count={article.comment.size}
                    like_count={article.like_count}
                    image_src={article.cover_image} />
                </ListGroupItem>
            )
        });
    }
    render() {
        return (
            <div className="container">
                <div className="row">
                    {this.props.homeSuggests &&
                        <Carousel>
                            {this.renderCarouselItems()}
                        </Carousel>
                    }
                </div>
                <div>
                    {this.props.articles && 
                        <ListGroup>
                            {this.renderArticleList()}
                        </ListGroup>
                    }
                </div>
            </div>
        )
    }

   
}

export default withTracker(() => {
    Meteor.subscribe('Article');
    Meteor.subscribe('HomeSuggest');
    return {
        articles: Article.find().fetch(),
        homeSuggests: HomeSuggest.find().fetch(),
    };
})(MainPage);
