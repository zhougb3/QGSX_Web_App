import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Button, Modal } from 'react-bootstrap';
import { Question } from '../api/collection';
import BriefQuestion from '../components/BriefQuestion';
import EditQuestion from '../components/EditQuestion';

// App component - represents the whole app
class QuestionPage extends Component {   
    constructor(props, context) {
        super(props, context);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.state = {
            show: false
        };
    }
    
    handleClose() {
        this.setState({ show: false });
    }
    
    handleShow() {
        this.setState({ show: true });
    }

    renderQuestions() {
        return this.props.questions.map((question) => {
            return (
                <BriefQuestion key={question._id} question={question} className="row"/>
            )
        })
    }

    render() {
        return (
            <div className="container">
                <Button onClick={this.handleShow} style={{marginTop: 100}}>
                    提问
                </Button>
                <div className="row container">
                    {this.props.questions && this.renderQuestions()}
                </div>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                    </Modal.Header >
                    <Modal.Body>
                        <EditQuestion />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleClose}>取消</Button>
                        <Button bsStyle="primary">提交</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default withTracker(() => {
    Meteor.subscribe('Question');
    // if (Meteor.subscribe('Question').ready()) console.log(Question.find().fetch());
    return {
        questions: Question.find().fetch(),
    };
})(QuestionPage);
