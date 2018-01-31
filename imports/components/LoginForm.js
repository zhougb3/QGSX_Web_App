import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {FormGroup, ControlLabel, FormControl, HelpBlock,Form, Col, Checkbox, Button} from 'react-bootstrap'

export default class LoginForm extends Component{
  constructor(props, context) {
    super(props, context);

    this.handleChange = this.handleChange.bind(this);
    this.getValidationState = this.getValidationState.bind(this);
    this.state = {
      value: '',
      whether:0,
    };
  }

  getValidationState() {
    const length = this.state.value.length;
    if (length > 6) return 'success';
    else if (length > 4) return 'warning';
    else if (length > 0) return 'error';
    return null;
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

    // Find the text field via the React ref
    const userName = ReactDOM.findDOMNode(this.userNameinput).value.trim();
    const userPassword = ReactDOM.findDOMNode(this.passwordinput).value.trim();
    if (this.getValidationState() != "success" || userPassword == '') {
        this.setState({whether:1});
        return;
    }

    ReactDOM.findDOMNode(this.userNameinput).value = '';
    ReactDOM.findDOMNode(this.passwordinput).value = '';
    var fun = (err)=> {
        if (err) {
            this.setState({ whether:1});
            console.log(err.reason);
        } else {
            this.setState({whether:2});
            console.log("登录成功！");
        } 
    }
    Meteor.loginWithPassword(userName,userPassword, fun.bind(this));
    
  }
  
  render() {
    return (
        <form onSubmit={this.handleSubmit.bind(this)}>
            <FormGroup
                controlId="formBasicText"
                validationState={this.getValidationState()}
            >
                <ControlLabel>用户名：</ControlLabel>
                <FormControl
                    type="text"
                    value={this.state.value}
                    placeholder="请输入您的用户名："
                    onChange={this.handleChange}
                    inputRef={ref => { this.userNameinput = ref; }}
                />
                <FormControl.Feedback />
            </FormGroup>
            
            <FormGroup 
                controlId="formHorizontalPassword"
            >
                <ControlLabel>密码：</ControlLabel>
                <FormControl 
                    type="password" 
                    placeholder="Password" 
                    inputRef={ref => { this.passwordinput = ref; }}
                />
                {this.state.whether == 1 ? 
                    <HelpBlock>账号不存在或密码错误！</HelpBlock>
                    : ''
                }
            </FormGroup>

            <FormGroup>
                <Checkbox>Remember me</Checkbox>
            </FormGroup>
        
            <FormGroup>
                <Button type="submit">Sign In</Button>
            </FormGroup>
          
        </form>
    )
  }
}