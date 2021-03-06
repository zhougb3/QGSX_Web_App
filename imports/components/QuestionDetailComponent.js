import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Question, Answer,User } from '../api/collection';
import { Button, Panel, FormGroup, FormControl, Image } from 'react-bootstrap';
import AnswerContainer, { AnswerBlock } from '../components/AnswerBlock';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import {browserHistory} from 'react-router';

export class TempQuestionDetail extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            open: false,
        }
    }

    handleSubmit(event) {
        event.preventDefault();
    
        // Find the text field via the React ref
        const answer = ReactDOM.findDOMNode(this.answerinput).value.trim();
        if (answer == '') {
            return;
        }
        console.log(answer);
        ReactDOM.findDOMNode(this.answerinput).value = '';
        if (!Meteor.userId()) {
            browserHistory.push('/registerLogin');
        } else {
            console.log(Meteor.user().username);
            Meteor.call('answer.insert', Meteor.user().username,this.props.question._id,answer);
        }      
    }
    followQuestion() {
        if (!Meteor.user() || !this.props.userInformation) {
            browserHistory.push('/registerLogin');
        }
        else {
            const userFollowQuestion = this.props.userInformation.follow_question;
            const follow_question_count = this.props.userInformation.follow_question_count + 1;
            for (i = 0; i < userFollowQuestion.length; ++i) {
                if (userFollowQuestion[i].toString() == this.props.question._id.toString())
                    return;
            }
            Meteor.call('question.addlike', this.props.question._id, this.props.question.like_count + 1);
            Meteor.call('user.updatefollowquestion', Meteor.user().username, this.props.question._id, follow_question_count);
        }        
    }
    renderAnswers() {
        return this.props.question.answerObject.map((eachAnswer) => {
            return (
                <AnswerContainer answer={eachAnswer} key={eachAnswer._id}>
                    <AnswerBlock />
                </AnswerContainer>
            )
        })
    }
    componentDidMount() {
        if (this.props.question) {
            Meteor.call('question.addviewcount', this.props.question._id, this.props.question.view_count + 1);
        }
    }    
    render() {
        return (
            <div className="row container-fluid">
                <div className="col-md-1 col-xs-0"/>
                <div className="col-md-10 col-xs-12">
                    <div className="row">
                        <div className="col-md-1 col-xs-2">
                            <Image src="/images/image.png" style={{width: "100%"}} circle />
                        </div>
                        <div className="col-md-9 col-xs-7 container-fluid">
                            <div style={{fontSize: 20}}>{this.props.question.sponser}</div>
                            <div style={{fontSize: 12, color: "grey"}}>{new moment(this.props.question.date).format("YYYY-MM-DD")}</div>
                        </div>
                        <div className="row col-md-2 col-xs-3" style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                            <div className="col-md-12 col-xs-12">
                                <div className="row" style={{display: "flex", justifyContent: "center", alignItems: "center"}}>浏览</div>
                                <div className="row" style={{display: "flex", justifyContent: "center", alignItems: "center"}}>{this.props.question.view_count}</div>
                            </div>
                            <div style={{width: 1, height: 40,  border: "1px solid #ccc"}} />
                            <div className="col-md-12 col-xs-12">
                                <div className="row" style={{display: "flex", justifyContent: "center", alignItems: "center"}}>关注</div>
                                <div className="row" style={{display: "flex", justifyContent: "center", alignItems: "center"}}>{this.props.question.like_count}</div>
                            </div>
                        </div>
                    </div>
                    <div className="row container-fluid">
                        <div className="row" style={{fontSize: 28, marginTop: 20, marginLeft: -15, marginRight: -15}}>{this.props.question.title}</div>
                        <Divider style={{marginLeft: -15, marginRight: -15}}/>
                        <div className="row" style={{fontSize: 16, marginTop: 10, marginBottom: 10, marginLeft: -15, marginRight: -15, color: "grey"}}>{this.props.question.content}</div>
                    </div>
                    <div className="row" style={{marginBottom: 20, marginTop: 20}}>
                        <Button onClick={this.followQuestion.bind(this)} style={{backgroundColor: "rgb(99,175,131)", color: "white", border: "none", borderRadius: 10, marginRight: 10, outline: "none"}}>关注问题</Button>
                        <Button onClick={() => this.setState({ open: !this.state.open })} style={{color: "rgb(99,175,131)", border: "1px solid rgb(99,175,131)", borderRadius: 10, outline: "none"}}>写回答</Button>
                    </div>
                    <div>
                        <Panel expanded={this.state.open} style={{visibility: this.state.open ? "visible" : "collapse"}}>
                            <Panel.Collapse>
                                <Panel.Heading>
                                    <Panel.Title componentClass="h3">{Meteor.user() ? Meteor.user().username : "请登录后参与回答"}</Panel.Title>
                                </Panel.Heading>
                                <Panel.Body>
                                    <form onSubmit={this.handleSubmit.bind(this)}>
                                        <FormGroup
                                            controlId="formBasicText"
                                        >
                                            <FormControl
                                                type="text"
                                                placeholder="写回答..."
                                                inputRef={ref => { this.answerinput = ref; }}
                                            />
                                        </FormGroup>
                                    
                                        <FormGroup>
                                            <Button type="submit">提交</Button>
                                        </FormGroup>
                                    </form>                        
                                
                                </Panel.Body>
                            </Panel.Collapse>
                        </Panel>
                    </div>
                    {this.props.question.answerObject && this.renderAnswers()}
                    {/* <Paper className="row" style={{position: "fixed", bottom: 20}}>
                        <span>写回答</span>
                    </Paper> */}
                </div>
                <div className="col-md-1 col-xs-0"/>
            </div>
        )
    }
}

export default QuestionDetailContainer = withTracker(({question_id}) => {
    const QuestionHandle = Meteor.subscribe('OneQuestion',question_id);
    const AnswerHandle = Meteor.subscribe('Answer', question_id);
    const getQuestion = Question.find({_id: question_id}).fetch();
    const allAnswer = Answer.find().fetch();
    const isQuestionReady = false;
    if (getQuestion.length > 0) {
        question = getQuestion[0];
        question.answerObject = [];
        that = this;
        allAnswer.map((eachAnswer) => {
            that.question.answerObject.push(eachAnswer);
        })
        isQuestionReady = true;
    }
    if (Meteor.user()) {
        const userInformation = User.find().fetch();
        if (userInformation && userInformation.length > 0) {
            return {
                question: isQuestionReady ? question : [],
                userInformation:userInformation[0],
            }            
        }
    }
    return {
        question: isQuestionReady ? question : [],
        userInformation: null,
    }
})(TempQuestionDetail);
