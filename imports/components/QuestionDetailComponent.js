import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Question, Answer } from '../api/collection';
import { Button } from 'react-bootstrap';
import AnswerContainer, { AnswerBlock } from '../components/AnswerBlock';
import Paper from 'material-ui/Paper';

export class TempQuestionDetail extends Component {
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
                {this.props.question.answerObject && this.renderAnswers()}
                <Paper className="row" style={{position: "fixed", bottom: 20}}>
                    <span>写回答</span>
                </Paper>
            </div>
        )
    }
}

export default QuestionDetailContainer = withTracker(({question_id}) => {
    const QuestionHandle = Meteor.subscribe('Question');
    const AnswerHandle = Meteor.subscribe('Answer');
    const getQuestion = Question.find({_id: new Mongo.ObjectID(question_id)}).fetch();
    const isQuestionReady = false;

    if (getQuestion.length > 0) {
        question = getQuestion[0];
        question.answerObject = [];
        that = this;
        question.answer.map((eachAnswer) => {
            getAnswer = Answer.find({_id: new Mongo.ObjectID(eachAnswer)}).fetch();
            if (getAnswer.length > 0) { 
                that.question.answerObject.push(getAnswer[0]);
            }
        })
        isQuestionReady = true;
    }
    return {
        question: isQuestionReady ? question : [],
    }
})(TempQuestionDetail);