import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {FormGroup, ControlLabel, FormControl, HelpBlock,Form, Col, Checkbox, Button} from 'react-bootstrap'
import {browserHistory} from 'react-router';
import { Session } from 'meteor/session'

export default class RegisterForm extends Component{
  constructor(props, context) {
    super(props, context);

    this.handleChange = this.handleChange.bind(this);
    this.state = {
      value: '',
      whetherUser:0,
      whetherPassword:0,
      registerSession:false,
    };
  }

    registerRemember() {
        this.setState({registerSession:!this.state.registerSession});
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
    this.setState({whetherUser: 1});
  }

  handleSubmit(event) {
    event.preventDefault();

    // Find the text field via the React ref
    const userName = ReactDOM.findDOMNode(this.userNameinput).value.trim();
    const userPassword = ReactDOM.findDOMNode(this.userNamePassword).value.trim();
    const userRepeatPassword = ReactDOM.findDOMNode(this.userNameRepeatPassword).value.trim();
    if (this.getValidationState() != "success") {
        this.setState({whetherUser:1});
        return;
    }
    if (userPassword != userRepeatPassword || userPassword == '') {
        this.setState({whetherPassword:1});
        return;
    }
    this.setState({whetherUser:2});
    this.setState({whetherPassword:2});
    
    ReactDOM.findDOMNode(this.userNameinput).value = '';
    ReactDOM.findDOMNode(this.userNamePassword).value = '';
    ReactDOM.findDOMNode(this.userNameRepeatPassword).value = '';
    
    var fun = (err)=> {
        if (err) {
            this.setState({whetherUser:3});
            console.log(err.reason);
        } else {
            console.log("注册成功！");
            Meteor.call('user.insert', userName);
            browserHistory.push('/');
        }
    }
    Accounts.createUser({username: userName, password : userPassword}, fun.bind(this));
      
  }
  
  render() {
    return (
        <form onSubmit={this.handleSubmit.bind(this)}>
            <FormGroup
                controlId="regisFormBasicText"
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
                {this.state.whetherUser == 1  && this.getValidationState() != "success" ? 
                              <HelpBlock>用户名需多于6个字符</HelpBlock>
                              : ''
                }
                {this.state.whetherUser == 3  ? 
                              <HelpBlock>用户名已经存在</HelpBlock>
                              : ''
                }                
            </FormGroup>
            
            <FormGroup 
                controlId="regisFormHorizontalPassword"
            >
                <ControlLabel>密码：</ControlLabel>
                <FormControl 
                    type="password" 
                    placeholder="密码"
                    inputRef={ref => { this.userNamePassword = ref; }}
                />
            </FormGroup>

            <FormGroup 
                controlId="regisFormHorizontalRepeatPassword"
            >
                <ControlLabel>确认密码：</ControlLabel>
                <FormControl 
                    type="password" 
                    placeholder="确认密码" 
                    inputRef={ref => { this.userNameRepeatPassword = ref; }}
                />
                {this.state.whetherPassword == 1 ? 
                    <HelpBlock>两次输入密码不一致或为空</HelpBlock>
                    : ''
                }
            </FormGroup>
            
            <FormGroup>
                <Checkbox onClick={this.registerRemember.bind(this)}>Remember me</Checkbox>
            </FormGroup>
        
            <FormGroup>
                <Button type="submit">注册</Button>
            </FormGroup>
          
        </form>
    )
  }
}