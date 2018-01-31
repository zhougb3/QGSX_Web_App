import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import {PageHeader, Tabs, Tab} from 'react-bootstrap';
import Paper from 'material-ui/Paper';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import RegisterForm from '../components/RegisterForm.js'
import LoginForm from '../components/LoginForm.js'

export default class RegisterLogin extends Component {
    
  render() {
    return (
        <div style={styles.bgcolor}>
            <PageHeader>
                <small style={styles.header}>勤工善学</small>
            </PageHeader>;
            <MuiThemeProvider>
                <Paper style={styles.paper} zDepth={3}>
                    <Tabs defaultActiveKey={1} id="rlchoose">
                        <Tab eventKey={1} title="登录">
                            <LoginForm / >
                        </Tab>
                        <Tab eventKey={2} title="注册">
                            <RegisterForm / >
                        </Tab>
                    </Tabs>
                </Paper>
            </MuiThemeProvider>
        </div>
    );
  }
}


const styles = {
    
    bgcolor : {
        backgroundColor:"RGB(241,241,241)",
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        padding: 0,
        margin: 0,
    },
    
    
    paper : {
      height: 400,
      width: 300,
      textAlign: 'center',
      display: 'inline-block',
      position: "fixed",
      top:"50%",
      left:"50%",
      marginTop: "-250px",
      marginLeft: "-150px",
    },
    
    header : {
      height: 40,
      width: 120,
      position: "absolute",
      marginTop: "20px",
      marginLeft: "28px",
      fontSize:"22px",
      color:"RGB(96,177,131)",
    },
}