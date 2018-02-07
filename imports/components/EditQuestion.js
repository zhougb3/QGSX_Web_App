import React, { Component } from 'react';
import { Form, FormGroup, ControlLabel, FormControl, HelpBlock, Button } from 'react-bootstrap';
import ReactDOM from 'react-dom';
import {browserHistory} from 'react-router';

export default class EditQuestion extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
        };
    }
    
    handleSubmit(event) {
        event.preventDefault();
    
        // Find the text field via the React ref
        const title = ReactDOM.findDOMNode(this.questiontitle).value.trim();
        const description = ReactDOM.findDOMNode(this.questiontdescription).value.trim();
        if (title == '') {
            return;
        }
    
        ReactDOM.findDOMNode(this.questiontitle).value = '';
        ReactDOM.findDOMNode(this.questiontdescription).value = '';
        if (!Meteor.userId()) {
            browserHistory.push('/registerLogin');
        } else {
            Meteor.call('question.insert', Meteor.user().username , title, description);
        }
  }
  
    render() {
        return (
            <div>
                <span className="row">写下你的问题</span>
                <span className="row">问题描述得越精确会吸引更多的人回答哦~</span>
                <form className="row" onSubmit= {this.handleSubmit.bind(this)}>
                    <FormGroup >
                        <FormControl
                            type="text"
                            inputRef={ref => { this.questiontitle = ref; }}
                            placeholder="问题标题"
                        />
                    </FormGroup>
                    <span className="row">问题描述(可选)</span>
                    <FormGroup >
                        <FormControl
                            type="text"
                            inputRef={ref => { this.questiontdescription = ref; }}
                            placeholder="问题背景、条件等详细信息……"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Button type="submit">提问</Button>
                    </FormGroup>
                </form>
            </div>
        )
    }
}
                        