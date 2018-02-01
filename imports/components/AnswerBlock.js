import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import { Panel } from 'react-bootstrap';
import { Reply } from '../api/collection';
import ReplyContainer, { ReplyBlock } from '../components/ReplyBlock';

export class AnswerBlock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            replyOpen: false,
        }
    }
    render() {
        return (
            <Panel defaultExpanded>
                <Panel.Heading>
                    <Panel.Title>{this.props.answer.sponser}</Panel.Title>
                    <Panel.Toggle>展开</Panel.Toggle>
                </Panel.Heading>
                <Panel.Collapse>
                    <Panel.Body>
                        <span className="row">{this.props.answer.content}</span>
                        <span className="row">{new moment(this.props.answer.date).format("YYYY-MM-DD")}</span>
                        <span onClick={() => this.setState({ replyOpen: !this.state.replyOpen })}>评论 {this.props.answer.replys.length}</span>
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
        )
    }
}

export default AnswerContainer = withTracker(({answer}) => {
    const ReplyHandle = Meteor.subscribe('Reply');
    answer.replyContent = [];
    that = answer.replyContent;
    if (ReplyHandle.ready()) {
        answer.replys.map((reply) => {
            that.push(Reply.find({_id: new Mongo.ObjectID(reply)}).fetch()[0]);
     
        })
    }
    return {
        answer: answer,
    }
})(AnswerBlock);