import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import NavigationBar from '../components/NavigationBar';

// App component - represents the whole app
export default class App extends Component {

  render() {
    return (
        <div>
            <NavigationBar />
            {this.props.children}
        </div>
    );
  }
}
