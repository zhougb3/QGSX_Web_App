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
                <BriefQuestion key={question._id} question={question}/>
            )
        })
    }

    render() {
        return (
            <div className="container">
                {/* <div className="row"> */}
                    <div className="col-md-1 col-xs-0"/>
                    <div className="col-md-10 col-xs-12">
                        <Button onClick={this.handleShow} style={{marginBottom: 20, marginLeft: 15}}>提问</Button>
                        <div className="row container-fluid">
                            {this.props.questions && this.renderQuestions()}
                        </div>
                        <Modal show={this.state.show} onHide={this.handleClose}>
                            <Modal.Header closeButton>
                            </Modal.Header >
                            <Modal.Body>
                                <EditQuestion />
                            </Modal.Body>
                        </Modal>
                    </div>
                    <div className="col-md-1 col-xs-0"/>
                {/* </div> */}
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
