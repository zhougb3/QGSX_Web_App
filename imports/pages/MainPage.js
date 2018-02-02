import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Carousel, Image, ButtonGroup, Button } from 'react-bootstrap';

import { HomeSuggest, Article } from '../api/collection';
import ArticleListContainer from '../components/ArticleListContainer';
import ArticleList from '../components/ArticleList';

class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sortType: {sort: {like_count: -1}},
        };
    }
    renderCarouselItems() {
        return this.props.homeSuggests.map((suggest) => {
            return (
                <Carousel.Item key={suggest._id} >
                    <a href={suggest.route}><Image src={suggest.image} responsive/></a>
                    {/* <Carousel.Caption>
                        <h3>First slide label</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption> */}
                </Carousel.Item>
            )
        });
    }
    onLikeClick() {
        this.setState({sortType: {sort: {like_count: -1}}});
    }
    onDateClick() {
        this.setState({sortType: {sort: {date: -1}}});
    }
    onCommentClick() {
        this.setState({sortType: {sort: {comment_count: -1}}});
    }
    render() {
        return (
            <div className="container">
                <div className="col-md-1 col-xs-0" />
                <div className="row col-md-10">
                    <div>
                        {this.props.homeSuggests &&
                            <Carousel interval={2000} style={styles.gallery}>
                                {this.renderCarouselItems()}
                            </Carousel>
                        }
                    </div>
                    <div className="row container">
                        <div className="col-md-1">排序方式</div>
                        <ButtonGroup className="col-md-4" bsSize="xsmall">
                            <Button style={styles.sortButton} onClick={this.onLikeClick.bind(this)}>热度</Button>
                            <Button style={styles.sortButton} onClick={this.onDateClick.bind(this)}>时间</Button>
                            <Button style={styles.sortButton} onClick={this.onCommentClick.bind(this)}>评论</Button>
                        </ButtonGroup>
                    </div>
                    <div className="row">
                        <ArticleListContainer sortType={this.state.sortType}>
                            <ArticleList />
                        </ArticleListContainer>
                    </div>
                </div>
                <div className="col-md-1 col-xs-0" />
            </div>
        )
    }
}

export default withTracker(({id}) => {
    Meteor.subscribe('HomeSuggest');
    return {
        homeSuggests: HomeSuggest.find().fetch(),
    };
})(MainPage);


const styles = {
    sortButton: {
        outline: "none",
    },
    gallery: {
        marginBottom: 40,
    },
}