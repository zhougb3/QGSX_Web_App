import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

// App component - represents the whole app
class ArticlePage extends Component {
    
  render() {
    return (
      <div className="container">
            WOSHILIJA
      </div>
    );
  }
}

// export default withTracker(() => {
//   Meteor.subscribe('articleList');

//   return {
//     articleList: ArticleList.find({}, { sort: { createdAt: -1 } }).fetch(),
//   };
// })(ArticlePage);
