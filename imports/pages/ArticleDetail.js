import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import ReactDOM from 'react-dom';
import { Image, Badge,Panel,Button, FormGroup, FormControl} from 'react-bootstrap';
import { Article, Comment ,Reply,User} from '../api/collection';
import CommentBlock from '../components/CommentBlock';
import {browserHistory} from 'react-router';

var Remarkable = require('remarkable');
var hljs = require('highlight.js');

class ArticleDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        };
        //this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleToggle = () => this.setState({open: !this.state.open});

    handleClose = () => this.setState({open: false});
    
    addArticleLike() {
        if (!Meteor.user()) {
            browserHistory.push('/registerLogin');
        }
        else {
            console.log("比较是否已经点赞了该文章");
            console.log(this.props.article._id);
            const userLikeArticle = User.find().fetch()[0].like_article;
            const like_count = User.find().fetch()[0].like_article_count + 1;
            for (i = 0; i < userLikeArticle.length; ++i) {
                console.log(userLikeArticle[i]);
                if (userLikeArticle[i].toString() == this.props.article._id.toString())
                    return;
            }
            Meteor.call('article.addlike', this.props.article.title, this.props.article.like_count + 1);
            Meteor.call('user.updatelikearticle', this.props.currentUser.username, this.props.article._id, like_count);
        }
    }
    renderComments() {
        return this.props.comments.map((comment) => {
            return (
                <div className="row container col-md-12 col-xs-12" key={comment._id}>
                    <CommentBlock
                        comment = {comment}
                        article = {this.props.article}
                        currentUser = {this.props.currentUser}
                    />
                </div>
            )
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        // Find the text field via the React ref
        if (ReactDOM.findDOMNode(this.givecommentinput) != null) {
            const replyToComment = ReactDOM.findDOMNode(this.givecommentinput).value.trim();
            // console.log("feiwu");
            // console.log(ReactDOM.findDOMNode(this.commentinput));
            if (replyToComment.length == 0) {
                console.log("youkong")
                return;
            }
            ReactDOM.findDOMNode(this.givecommentinput).value = '';
            if (!Meteor.userId()) {
                browserHistory.push('/registerLogin');
            } else {
                console.log(this.props.currentUser.username);
                Meteor.call('comment.insert', this.props.article.title, replyToComment, this.props.currentUser.username, 0,this.props.article.comment_count + 1);
            }
        }
    }
    renderGiveComment() {
        return (
            <div className="container-fluid">
                <form className="row container-fluid col-md-12 col-xs-12" onSubmit={this.handleSubmit.bind(this)}>
                    <Image className="col-md-2 col-xs-2" src="/images/image.png" circle style={{marginLeft: -15, marginRight: 15}}/>
                    <FormGroup className="col-md-10 col-xs-10" controlId="commentsubmit">
                        <FormControl 
                            type="text" 
                            placeholder="发表评论" 
                            inputRef={ref => { this.givecommentinput = ref; }}
                            style={{width: "100%", height: 100}}
                        />
                        <Button type="submit">发表</Button>
                    </FormGroup>
                </form>
            </div> 
        )
    }
    
    rawMarkup(){
        var md = new Remarkable({
          html:         false,        // Enable html tags in source
          xhtmlOut:     false,        // Use '/' to close single tags (<br />)
          breaks:       false,        // Convert '\n' in paragraphs into <br>
          langPrefix:   'language-',  // CSS language prefix for fenced blocks
          linkify:      false,        // Autoconvert url-like texts to links
          typographer:  false,        // Enable smartypants and other sweet transforms
          // Highlighter function. Should return escaped html,
          // or '' if input not changed
          highlight: function (/*str, , lang*/) { return ''; }
        });
        var rawMarkup = md.render(this.props.article.content);
        return {__html:rawMarkup};
    }
  
    render() {
        
        return (
            <div className="container">
                <RaisedButton
                    label="打开目录"
                    onClick={this.handleToggle}
                    style={{position: "fixed", bottom: 20, left: 20, visibility: "collapse"}}
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
                <div className="col-md-1 col-xs-0" />
                {this.props.article &&
                    <div className="row container-fluid col-md-10 col-xs-12">
                        <Paper className="row container col-md-12 col-xs-12" zDepth={2} style={{marginBottom: 30}}>
                            <div className="col-md-1 col-xs-1"/>
                            <div className="col-md-10, col-xs-10">
                                <div className="row text-center" style={{width: "100%", fontSize: 40, marginTop: 20, overflow: "hidden", textOverflow: "ellipsis"}}>
                                    {this.props.article.title}
                                </div>
                                <h4 className="text-center"><small className="row">{this.props.article.description}</small></h4>
                                <Image className="row image-responsive center-block" src={this.props.article.cover_image} style={{width: "100%"}} />
                                <div className="container-fluid row">
                                    <div className="row">
                                        <span dangerouslySetInnerHTML={this.rawMarkup()}/>
                                    </div>
                                </div>
                                <Button className="row" onClick={this.addArticleLike.bind(this)} style={{marginTop: 10, marginRight: 15}}>喜欢 | {this.props.article.like_count}</Button>
                                <Divider />
                                {this.renderGiveComment()}
                            </div>
                            <div className="col-md-1 col-xs-1"/>
                        </Paper>
                        <div style={{marginBottom: 10}}>评论总数<Badge>{this.props.article.comment_count}</Badge></div>
                        {this.renderComments()}
                    </div>
                }
                <div className="col-md-1 col-xs-0" />
            </div>
        );
    }
}

export default withTracker(({params}) => {
    Meteor.subscribe("OneArticle",params.name);
    Meteor.subscribe("Comment", params.name);
    Meteor.subscribe("Reply", params.name);
    if (Meteor.user())
        Meteor.subscribe("UserInformation", Meteor.user().username);
    //const ArticleHandle = Meteor.subscribe('Article');
    // const CommentHandle = Meteor.subscribe('Comment');
    // const articleLoading = !ArticleHandle.ready();
    // const commentLoading = !CommentHandle.ready();
    // articles = Article.find().fetch();

    // for (i = 0; i < articles.length; i++) {
    //     articles[i].commentContent = new Array();
    //     //console.log(articles);
    //     for (j = 0; j < articles[i].comment.length; j++) {
    //         console.log(Comment.find({_id: articles[i].comment[j]}).fetch());
    //         articles[i].commentContent.push(Comment.find({_id: articles[i].comment[j]}).fetch());
    //     }
    // }
    // // articles.map((article) => {
    // //     article.commentContent = new Array();
    // //     console.log(article.commentContent);
    // //     article.comment.map((commentID) => {
    // //         article.commentContent.push(Comment.findOne({_id: commentID}));
    // //     });
    // // });
    // //if (commentLoading) console.log(articles);
   //console.log(Reply.find({}).fetch());
    // const Article = Article.findOne();
    // const commentList = new Array();
    // for (int i = 0; i < Article.comment.length; ++i) {
    //     Comment.find({_id: articles[i].comment[j]}).fetch();
    // }
    
    return {
        //article:Article.find({title:params.name}).fetch()[0],
        article: Article.find().fetch()[0],
        comments:Comment.find({}, { sort: { date: -1 } }).fetch(),
        replys:Reply.find().fetch(),
        currentUser:Meteor.user(),
    };
})(ArticleDetail);
