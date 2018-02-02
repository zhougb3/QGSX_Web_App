import React, { Component } from 'react';
import { Form, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';

export default class EditQuestion extends Component {
    constructor(props, context) {
        super(props, context);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleDetailChange = this.handleDetailChange.bind(this);
        this.state = {
            titleValue: '',
            detailValue: '',
        };
    }
    
    getTitleValidationState() {
        length = this.state.titleValue.length;
        if (length >= 5) return 'success';
        else if (length > 0) return 'error';
        return null;
    }

    getDetailValidationState() {
        length = this.state.detailValue.length;
        if (length >= 10) return 'success';
        else if (length > 0) return 'error';
        return null;
    }
    
    handleTitleChange(e) {
        this.setState({ titleValue: e.target.value });
    }

    handleDetailChange(e) {
        this.setState({ detailValue: e.target.value });
    }
    
    render() {
        return (
            <div>
                <span className="row">写下你的问题</span>
                <span className="row">问题描述得越精确会吸引更多的人回答哦~</span>
                <form className="row">
                    <FormGroup
                        validationState={this.getTitleValidationState()} >
                        <FormControl
                            type="text"
                            value={this.state.titleValue}
                            placeholder="问题标题"
                            onChange={this.handleTitleChange} />
                    </FormGroup>
                    <span className="row">问题描述(可选)</span>
                    <FormGroup
                        validationState={this.getDetailValidationState()} >
                        <FormControl
                            type="text"
                            value={this.state.detailValue}
                            placeholder="问题背景、条件等详细信息……"
                            onChange={this.handleDetailChange} />
                    </FormGroup>
                </form>
            </div>
        )
    }
}
                        