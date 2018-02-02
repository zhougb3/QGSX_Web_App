import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import ReactDOM from 'react-dom';
import { Image, Badge,Panel,Button, FormGroup,FormControl} from 'react-bootstrap';
import { Article, Comment ,Reply} from '../api/collection';
import {browserHistory} from 'react-router';

export default class CommentBlock extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
          open: false
        };
    }
    
    handleSubmit(id, user,currentUser,e) {
        e.preventDefault();
        // Find the text field via the React ref
        if (ReactDOM.findDOMNode(this.commentinput) != null) {
            const replyToComment = ReactDOM.findDOMNode(this.commentinput).value.trim();
            console.log("feiwu");
            console.log(ReactDOM.findDOMNode(this.commentinput));
            if (replyToComment.length == 0) {
                console.log("youkong")
                return;
            }
            ReactDOM.findDOMNode(this.commentinput).value = '';
            if (!Meteor.userId()) {
                browserHistory.push('/registerLogin');
            } else {
                console.log(currentUser.username);
                Meteor.call('reply.insert', replyToComment, currentUser.username, user, this.props.article.title, id);
            }
        }
    }
    
    addCommentLike() {
        Meteor.call('comment.addlike', this.props.comment._id, this.props.comment.like_count + 1);
    }
        
    renderReply(commentId) {
        const allReply = Reply.find({comment: commentId}).fetch();
        // console.log(commentId);
        // console.log(allReply.length);
        // console.log("chihuo");
        return allReply.map((reply) => {
            return (
                <div className="row" key={reply._id}>
                    <div className="col-md-10 col-xs-9" style={{marginTop: 7, marginBottom: 7}}> {reply.from}回复{reply.to} :{reply.content}</div>
                    <Button className="col-md-2 col-xs-3" bsSize="small">回复</Button>
                    <Divider />
                </div>
            )
        });
    }
    
    render() {
        return (
            <Paper key={this.props.comment._id} className="container-fluid col-md-12 col-xs-12" style={{marginBottom: 20, paddingTop: 20}}>
                <div className="row container-fluid col-md-12 col-xs-12">
                    <div className="col-md-1 col-xs-2" style={{marginLeft: -15}}>
                        <Image className="image-responsive" src={this.props.article.cover_image} style={{width: "100%"}} circle/>
                    </div>
                    <div className="col-md-11 col-xs-10 container-fluid">
                        <div className="row">{this.props.comment.user}</div>
                        <div className="row"><small>{new moment(this.props.comment.date).format("YYYY-MM-DD")}</small></div>
                    </div>
                </div>
                <div className="row col-md-12 col-xs-12" style={{marginTop: 20, marginLeft: 20, marginBottom: 20}}>{this.props.comment.content}</div>
                <Button onClick={this.addCommentLike.bind(this)}>点赞数 | {this.props.comment.like_count}</Button>
                <Button onClick={() => this.setState({ open: !this.state.open })}>回复</Button>
                <div>
                    <Panel expanded={this.state.open} style={{visibility: this.state.open ? "visible" : "collapse"}}>
                        <Panel.Collapse>
                            <Panel.Body>
                                <form onSubmit={this.handleSubmit.bind(this,this.props.comment._id, this.props.comment.user, this.props.currentUser)}>
                                    <FormGroup controlId="commentsubmit">
                                        <FormControl 
                                            type="text" 
                                            placeholder="发表回复" 
                                            inputRef={ref => { this.commentinput = ref; }}
                                        />
                                        <Button type="submit">发表</Button>
                                    </FormGroup>
                                </form>
                            </Panel.Body>
                        </Panel.Collapse>
                    </Panel>
                </div>
                <div className="col-md-12 col-xs-12" style={{marginTop: 20, marginBottom: 20, paddingLeft: 10, paddingTop: 3, paddingBottom: 10, border: "2px solid #ccc", borderWidth: "0 0 0 2px"}}>
                    {this.renderReply(this.props.comment._id)}
                </div>
            </Paper>
        )
    }
}