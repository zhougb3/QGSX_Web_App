import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import { Image } from 'react-bootstrap';
import { Article, Comment } from '../api/collection';
import { CommentBlock } from '../components/CommentBlock';

class ArticleDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {open: false};
    }
    
    handleToggle = () => this.setState({open: !this.state.open});

    handleClose = () => this.setState({open: false});
    
    renderComments() {
        return this.props.article.comment.map((comment) => {
            return (
                <CommentBlock comment_id={comment}/>
            )
        });
    }

    render() {
        return (
            <div className="container">
                <RaisedButton className="row"
                    label="Open Drawer"
                    onClick={this.handleToggle}
                    style={{marginTop: 100}}
                />
                <Drawer
                    docked={false}
                    width={280}
                    open={this.state.open}
                    onRequestChange={(open) => this.setState({open})}>
                    <MenuItem onClick={this.handleClose}>Menu Item</MenuItem>
                    <Divider />
                    <MenuItem onClick={this.handleClose}>Menu Item 2</MenuItem>
                </Drawer>
                {this.props.article &&
                    <div className="row">
                        <Paper className="row container" zDepth={2}>
                            <div className="row">
                                {this.props.article.title}
                            </div>
                            <div className="row">{this.props.article.description}</div>
                            <Image className="row image-responsive" src={this.props.article.cover_image} style={{width: 800}}/>
                            <div className="row">{this.props.article.content}</div>
                        </Paper>
                        <Divider />
                        <Paper className="row">
                            {this.renderComments()}
                        </Paper>
                    </div>
                }
            </div>
        );
    }
}

export default withTracker(() => {
    const ArticleHandle = Meteor.subscribe('Article');
    const CommentHandle = Meteor.subscribe('Comment');
    const articleLoading = !ArticleHandle.ready();
    const commentLoading = !CommentHandle.ready();
    articles = Article.find().fetch();

    for (i = 0; i < articles.length; i++) {
        articles[i].commentContent = new Array();
        console.log(articles);
        for (j = 0; j < articles[i].comment.length; j++) {
            console.log(Comment.find({_id: articles[i].comment[j]}).fetch());
            articles[i].commentContent.push(Comment.find({_id: articles[i].comment[j]}).fetch());
        }
    }
    // articles.map((article) => {
    //     article.commentContent = new Array();
    //     console.log(article.commentContent);
    //     article.comment.map((commentID) => {
    //         article.commentContent.push(Comment.findOne({_id: commentID}));
    //     });
    // });
    if (commentLoading) console.log(articles);
    return {
        article: Article.findOne(),
    };
})(ArticleDetail);