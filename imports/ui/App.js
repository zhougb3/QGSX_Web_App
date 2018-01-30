import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

// App component - represents the whole app
export default class App extends Component {

  render() {
    return (
      <div className="container">
            LKJJLJLKJLJLJLKJKLJJLJ
            {this.props.children}
      </div>
    );
  }
}
