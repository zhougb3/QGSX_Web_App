import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Question, Answer } from '../api/collection';
import { Button, Panel, FormGroup, FormControl} from 'react-bootstrap';
import AnswerContainer, { AnswerBlock } from '../components/AnswerBlock';
import Paper from 'material-ui/Paper';
import {browserHistory} from 'react-router';

export class TempQuestionDetail extends Component {
    
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
    renderAnswers() {
        return this.props.question.answerObject.map((eachAnswer) => {
            return (
                <AnswerContainer answer={eachAnswer} key={eachAnswer._id}>
                    <AnswerBlock />
                </AnswerContainer>
            )
        })
    }
    render() {
        return (
            <div className="row container" style={{marginTop: 50}}>
                <span className="row">{this.props.question.title}</span>
                <span>浏览: {this.props.question.view_count}</span>
                <span>关注: {this.props.question.favorite_count}</span>
                <div className="row">
                    <Button>关注问题</Button>
                    <Button>写回答</Button>
                </div>
                <div>
                      <Panel>
                        <Panel.Heading>
                          <Panel.Title componentClass="h3">{Meteor.userId() ? Meteor.user().username : 请登录后参与回答}</Panel.Title>
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
                      </Panel>
                </div>
                {this.props.question.answerObject && this.renderAnswers()}
                <Paper className="row" style={{position: "fixed", bottom: 20}}>
                    <span>写回答</span>
                </Paper>
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
    return {
        question: isQuestionReady ? question : [],
    }
})(TempQuestionDetail);
