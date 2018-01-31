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
                <Carousel.Item key={suggest._id}>
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
                <div className="row" style={styles.topBlank}/>
                <div className="row">
                    {this.props.homeSuggests &&
                        <Carousel interval={2000}>
                            {this.renderCarouselItems()}
                        </Carousel>
                    }
                </div>
                <div className="row">
                    <ButtonGroup>
                        <Button style={styles.sortButton} onClick={this.onLikeClick.bind(this)}>Like</Button>
                        <Button style={styles.sortButton} onClick={this.onDateClick.bind(this)}>Date</Button>
                        <Button style={styles.sortButton} onClick={this.onCommentClick.bind(this)}>Comment</Button>
                    </ButtonGroup>
                </div>
                <div className="row">
                    <ArticleListContainer sortType={this.state.sortType}>
                        <ArticleList />
                    </ArticleListContainer>
                </div>
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
    topBlank: {
        height: 80,
    },
    suggestPicture: {
    },
}