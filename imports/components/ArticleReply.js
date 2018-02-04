import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import ReactDOM from 'react-dom';
import { Image, Badge,Panel,Button, FormGroup,FormControl,Modal} from 'react-bootstrap';
import { Article, Comment ,Reply,User} from '../api/collection';
import {browserHistory} from 'react-router';

export default class ArticleReply extends Component {

    constructor(props, context) {
        super(props, context);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.state = {
            replyopen:false,
            show: false,
        };
    }
    
    handleSubmit(id, user,currentUser,e) {
        e.preventDefault();
        // Find the text field via the React ref
        if (ReactDOM.findDOMNode(this.replycommentinput) != null) {
            const replyToComment = ReactDOM.findDOMNode(this.replycommentinput).value.trim();
            console.log("feiwu");
            console.log(ReactDOM.findDOMNode(this.replycommentinput));
            if (replyToComment.length == 0) {
                console.log("youkong")
                return;
            }
            ReactDOM.findDOMNode(this.replycommentinput).value = '';
            if (!Meteor.userId()) {
                browserHistory.push('/registerLogin');
            } else {
                console.log(currentUser.username);
                Meteor.call('reply.insert', replyToComment, currentUser.username, user, this.props.article.title, id);
            }
        }
    }
    
    handleClose() {
        this.setState({ show: false });
    }
    
    handleShow() {
        this.setState({ show: true });
    }

    render() {
        return (
            <div className="row" key={this.props.reply._id}>
                <div className="col-md-10 col-xs-9" style={{marginTop: 7, marginBottom: 7}}> {this.props.reply.from}回复{this.props.reply.to} :{this.props.reply.content}</div>
                <Button className="col-md-2 col-xs-3" bsSize="small" style={{}} onClick={this.handleShow}>回复</Button>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                    </Modal.Header >
                    <Modal.Body>
                        <form onSubmit={this.handleSubmit.bind(this,this.props.commentId, this.props.reply.from, this.props.currentUser)}>
                            <FormGroup controlId="replycommentsubmit">
                                <FormControl 
                                    type="text" 
                                    placeholder="发表评论" 
                                    inputRef={ref => { this.replycommentinput = ref; }}
                                />
                                <Button type="submit">发表</Button>
                            </FormGroup>
                        </form>
                    </Modal.Body>
                </Modal>
                <Divider />
            </div>
        )
    }
}