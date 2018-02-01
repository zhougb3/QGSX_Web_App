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
                <Paper className="row" key={reply._id}>
                    <div className="row"> {reply.from}回复{reply.to} :{reply.content}</div>
                </Paper>
            )
        });
    }
    
    render() {
        return (
            <Panel key={this.props.comment._id}>
                                <Panel.Heading>
                                    <Image className="row image-responsive" src={this.props.article.cover_image} style={{width: 30}} circle/>
                                    <div className="row"> {this.props.comment.user} </div>
                                    <div className="row">{this.props.comment.date.toString()}</div>
                                </Panel.Heading>
                                <Panel.Body>
                                    <div className="row">{this.props.comment.content}</div>
                                    <div>
                                        <Button onClick={this.addCommentLike.bind(this)}>点赞数 | {this.props.comment.like_count}</Button>

                                    <Panel id="collapsible-panel-example-2">
                                      <Panel.Heading>
                                        <Panel.Title toggle>
                                          回复
                                        </Panel.Title>
                                      </Panel.Heading>
                                            <Panel.Collapse>
                                                <Panel.Body>
                                                    <form onSubmit={this.handleSubmit.bind(this,this.props.comment._id, this.props.comment.user, this.props.currentUser)}>
                                                        <FormGroup controlId="commentsubmit">
                                                            <FormControl 
                                                                type="text" 
                                                                placeholder="发表回复" 
                                                                inputRef={ref => { this.commentinput = ref; }}
                                                            />
                                                        </FormGroup>
                                                        <FormGroup>
                                                            <Button type="submit">发表</Button>
                                                        </FormGroup>
                                                    </form>
                                                </Panel.Body>
                                            </Panel.Collapse>
                                        </Panel>
                                    </div>
                                    {this.renderReply(this.props.comment._id)}
                                </Panel.Body>
            </Panel>
        )
    }
}