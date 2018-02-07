import { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';
import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import { Panel,FormGroup,FormControl,Button,Image,Modal } from 'react-bootstrap';
import { QuestionReply } from '../api/collection';
import ReplyContainer, { ReplyBlock} from '../components/ReplyBlock';
import AnswerReply from '../components/AnswerReply';
import {browserHistory} from 'react-router';

export class AnswerBlock extends Component {
    constructor(props) {
        super(props);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.state = {
            replyOpen: false,
            show: false,
        }
    }
    handleSubmit(e) {
        e.preventDefault();
        // Find the text field via the React ref
        if (ReactDOM.findDOMNode(this.replyinput) != null) {
            const replyToAnswer = ReactDOM.findDOMNode(this.replyinput).value.trim();
            console.log(ReactDOM.findDOMNode(this.replyinput).value);
            if (replyToAnswer.length == 0) {
                console.log("youkong")
                return;
            }
            ReactDOM.findDOMNode(this.replyinput).value = '';
            if (!Meteor.userId()) {
                browserHistory.push('/registerLogin');
            } else {
                console.log(this.props.currentUser.username);
                Meteor.call('answerreply.insert', this.props.currentUser.username,this.props.answer.sponser,replyToAnswer,this.props.answer._id,this.props.answer.replys_count + 1);
            }
        }        
    }
    handleClose() {
        this.setState({ show: false });
    }
    
    handleShow() {
        this.setState({ show: true });
    }

    renderReply() {
        return this.props.answer.replyContent.map((reply) => {
            return (
                <AnswerReply
                key = {reply._id}
                reply = {reply}
                currentUser = {this.props.currentUser}
                answer = {this.props.answer}
                />
            )
        });
    }

    render() {
        return (
            <div>
                <Paper className="container-fluid col-md-12 col-xs-12" style={{marginBottom: 20, paddingTop: 20}}>
                <div className="row container-fluid col-md-12 col-xs-12">
                    <div className="col-md-1 col-xs-2" style={{marginLeft: -15}}>
                        <Image className="image-responsive" src="/images/image.png" style={{width: "100%"}} circle/>
                    </div>
                    <div className="col-md-11 col-xs-10 container-fluid">
                        <div className="row">{this.props.answer.sponser}</div>
                        <div className="row"><small>{new moment(this.props.answer.date).format("YYYY-MM-DD")}</small></div>
                    </div>
                </div>
                <div className="row col-md-12 col-xs-12" style={{marginTop: 20, marginBottom: 20}}>{this.props.answer.content}</div>
                <div className="row col-md-12 col-xs-12" style={{display: "flex", justifyContent: "flex-start", marginBottom: 20}}>
                    <div style={{marginRight: 20}}>
                        <i class="far fa-thumbs-up"></i> {this.props.answer.like_count}
                    </div>
                    <div style={{marginRight: 20}}>
                        <i class="far fa-thumbs-down"></i> {this.props.answer.dislike_count}
                    </div>
                    <div style={{marginRight: 20}}>
                        <i class="fas fa-comments"></i> {this.props.answer.replys_count}
                    </div>
                </div>
                <div className="col-md-2 col-xs-6">
                    <Button onClick={this.handleShow} style={{color: "rgb(99,175,131)", border: "1px solid rgb(99,175,131)", borderRadius: 10, marginRight: 10, outline: "none", width: "100%"}}>回复</Button>
                </div>
                {/* <div className="col-md-6 col-xs-6" style={{display: "flex", justifyContent: "flex-end"}}>
                    <div>评论量 | {this.props.answer.replys.length}</div>
                </div> */}
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                    </Modal.Header >
                    <Modal.Body>
                        <form onSubmit={this.handleSubmit.bind(this)}>
                            <FormGroup
                                controlId="formBasicText"
                            >
                                <FormControl
                                    type="text"
                                    placeholder="评论回答..."
                                    inputRef={ref => { this.replyinput = ref; }}
                                />
                            </FormGroup>
                        
                            <FormGroup>
                                <Button type="submit">提交</Button>
                            </FormGroup>
                        </form>
                    </Modal.Body>
                </Modal>
                
                <div className="col-md-12 col-xs-12" style={{marginTop: 20, marginBottom: 20, paddingLeft: 10, paddingBottom: 10, border: "2px solid #ccc", borderWidth: "0 0 0 2px"}}>
                    {this.renderReply()}
                </div>
            </Paper>   
          </div>
        )
    }
}

export default AnswerContainer = withTracker(({answer}) => {
    const ReplyHandle = Meteor.subscribe('QuestionReply',answer._id);
    answer.replyContent = [];
    allreply = QuestionReply.find().fetch();
    that = answer.replyContent;
    if (ReplyHandle.ready()) {
        allreply.map((reply) => {
            that.push(reply);
        })
    }
    return {
        answer: answer,
        currentUser:Meteor.user(),
    }
})(AnswerBlock);
