import { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';
import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import { Panel,FormGroup,FormControl,Button } from 'react-bootstrap';
import { QuestionReply } from '../api/collection';
import ReplyContainer, { ReplyBlock} from '../components/ReplyBlock';
import {browserHistory} from 'react-router';

export class AnswerBlock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            replyOpen: false,
        }
    }
    handleSubmit(e) {
        e.preventDefault();
        // Find the text field via the React ref
        if (ReactDOM.findDOMNode(this.replyinput) != null) {
            const replyToAnswer = ReactDOM.findDOMNode(this.replyinput).value.trim();
            console.log("feiwu");
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
    render() {
        return (
            <div>
                <Panel defaultExpanded>
                    <Panel.Heading>
                        <Panel.Title>{this.props.answer.sponser}</Panel.Title>
                        <Panel.Toggle>展开</Panel.Toggle>
                    </Panel.Heading>
                    <Panel.Collapse>
                        <Panel.Body>
                            <span className="row">{this.props.answer.content}</span>
                            <span className="row">{new moment(this.props.answer.date).format("YYYY-MM-DD")}</span>
                            <span onClick={() => this.setState({ replyOpen: !this.state.replyOpen })}>评论 {this.props.answer.replys_count}</span>
                            <Divider />
                            <Panel expanded={this.state.replyOpen}>
                                <Panel.Collapse>
                                    <Panel.Body>
                                        <ReplyContainer replys={this.props.answer.replyContent}>
                                            <ReplyBlock />
                                        </ReplyContainer>
                                    </Panel.Body>
                                </Panel.Collapse>
                            </Panel>
                        </Panel.Body>
                    </Panel.Collapse>
              </Panel>
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