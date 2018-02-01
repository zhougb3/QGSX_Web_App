import React, { Component } from 'react';
import { Form, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';

export default class EditQuestion extends Component {
    constructor(props, context) {
        super(props, context);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            value: ''
        };
    }
    
    getValidationState() {
        const length = this.state.value.length;
        if (length >= 5) return 'success';
        else if (length > 0) return 'error';
        return null;
    }
    
    handleChange(e) {
        this.setState({ value: e.target.value });
    }
    
    render() {
        return (
            <div>
                <span className="row">写下你的问题</span>
                <span className="row">问题描述得越精确会吸引更多的人回答哦~</span>
                <form className="row">
                    <FormGroup
                        validationState={this.getValidationState()} >
                        <FormControl
                            type="text"
                            value={this.state.value}
                            placeholder="问题标题"
                            onChange={this.handleChange} />
                    </FormGroup>
                </form>
                <span className="row">问题描述(可选)</span>
                <form className="row">
                    <FormGroup
                        validationState={this.getValidationState()} >
                        <FormControl
                            type="text"
                            value={this.state.value}
                            placeholder="问题背景、条件等详细信息……"
                            onChange={this.handleChange} />
                    </FormGroup>
                </form>
            </div>
        )
    }
}
                        