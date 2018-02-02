import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import NavigationBar from '../components/NavigationBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// App component - represents the whole app
export default class App extends Component {
    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <NavigationBar />
                    <div style={{height: 80}}/>
                    {this.props.children}
                </div>
            </MuiThemeProvider>
        );
    }
}
