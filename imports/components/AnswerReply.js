import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import ReactDOM from 'react-dom';
import { Image, Badge,Panel,Button, FormGroup,FormControl,Modal} from 'react-bootstrap';
import { Article, Comment ,Reply,User} from '../api/collection';
import {browserHistory} from 'react-router';

export default class AnswerReply extends Component {

    constructor(props, context) {
        super(props, context);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.state = {
            replyopen: false,
            replyState: "hidden",
            show: false,
        };
    }
    
    handleSubmit(id, user,currentUser,e) {
        e.preventDefault();
        // Find the text field via the React ref
        if (ReactDOM.findDOMNode(this.replyanswerinput) != null) {
            const replyToComment = ReactDOM.findDOMNode(this.replyanswerinput).value.trim();
            console.log("feiwu");
            console.log(ReactDOM.findDOMNode(this.replyanswerinput));
            if (replyToComment.length == 0) {
                console.log("youkong")
                return;
            }
            ReactDOM.findDOMNode(this.replyanswerinput).value = '';
            if (!Meteor.userId()) {
                browserHistory.push('/registerLogin');
            } else {
                console.log(currentUser.username);
                Meteor.call('answerreply.insert', currentUser.username,user,replyToComment,id,this.props.answer.replys_count + 1);
            }
        }
    }
    
    handleClose() {
        this.setState({ show: false });
    }
    
    handleShow() {
        this.setState({ show: true });
    }

    handleMouseEnter() {
        this.setState({replyState: "visible"});
    }

    handleMouseLeave() {
        this.setState({replyState: "hidden"});
    }

    createMarkup() {
        console.log('<div>' + this.props.reply.from + '回复' + this.props.reply.to + ': ' + this.props.reply.content + '</div>')
        // return {__html: '<div>' + this.props.reply.from + '回复' + this.props.reply.to + ': ' + this.props.reply.content + '</div>'};
        return {__html: '<math xmlns="http://www.w3.org/1998/Math/MathML"><msqrt><msup><mn>5</mn><mn>2</mn></msup></msqrt></math>'};
    }

    render() {
        // var parser = new DOMParser();
        // var renderReply = parser.parseFromString('<div id="content-div">' + this.props.reply.content + '</div>', 'text/xml');
        // console.log(renderReply.getElementById('content-div'));
        return (
            <div className="row" key={this.props.reply._id}>
                <div className="col-md-12 col-xs-12 row" style={{marginLeft: 4}} onMouseEnter={this.handleMouseEnter.bind(this)} onMouseLeave={this.handleMouseLeave.bind(this)}>
                    {/* <div className="col-md-11 col-xs-10" style={{marginTop: 7, marginBottom: 7}}> {this.props.reply.from}回复{this.props.reply.to}: {this.props.reply.content}</div> */}
                    <div className="col-md-11 col-xs-10" style={{marginTop: 7, marginBottom: 7}} dangerouslySetInnerHTML={this.createMarkup()}/>
                    {/* <div dangerouslySetInnerHTML={this.createMarkup()} /> */}
                    <div className="col-md-1 col-xs-2">
                        <FlatButton label="回复" onClick={this.handleShow} style={{color: "rgb(99,175,131)", visibility: this.state.replyState}} />
                    </div>
                </div>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                    </Modal.Header >
                    <Modal.Body>
                        <form onSubmit={this.handleSubmit.bind(this,this.props.answer._id, this.props.reply.from, this.props.currentUser)}>
                            <FormGroup controlId="replycommentsubmit">
                                <FormControl 
                                    type="text" 
                                    placeholder="发表评论" 
                                    inputRef={ref => { this.replyanswerinput = ref; }}
                                />
                                <Button type="submit">发表</Button>
                            </FormGroup>
                        </form>
                    </Modal.Body>
                </Modal>
                <Divider className="col-md-12 col-xs-12 row"/>
            </div>
        )
    }
}