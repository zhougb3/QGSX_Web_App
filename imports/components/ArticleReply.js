import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import ReactDOM from 'react-dom';
import { Image, Badge,Panel,Button, FormGroup,FormControl} from 'react-bootstrap';
import { Article, Comment ,Reply,User} from '../api/collection';
import {browserHistory} from 'react-router';

export default class ArticleReply extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
          replyopen:false,
        };
    }
    
    handleSubmit(id, user,currentUser,e) {
        e.preventDefault();
        // Find the text field via the React ref
        if (ReactDOM.findDOMNode(this.replycommentinput) != null) {
            const replyToComment = ReactDOM.findDOMNode(this.replycommentinput).value.trim();
            console.log("feiwu");
            console.log(ReactDOM.findDOMNode(this.replycommentinput));
            if (replyToComment.length == 0) {
                console.log("youkong")
                return;
            }
            ReactDOM.findDOMNode(this.replycommentinput).value = '';
            if (!Meteor.userId()) {
                browserHistory.push('/registerLogin');
            } else {
                console.log(currentUser.username);
                Meteor.call('reply.insert', replyToComment, currentUser.username, user, this.props.article.title, id);
            }
        }
    }
    
    render() {
            return (
                <div className="row" key={this.props.reply._id}>
                    <div className="col-md-10 col-xs-9" style={{marginTop: 7, marginBottom: 7}}> {this.props.reply.from}回复{this.props.reply.to} :{this.props.reply.content}</div>
                    <Button className="col-md-2 col-xs-3" bsSize="small" onClick={() => this.setState({ replyopen: !this.state.replyopen })}>回复</Button>
                    <div>
                        <Panel expanded={this.state.replyopen} style={{visibility: this.state.replyopen ? "visible" : "collapse"}}>
                            <Panel.Collapse>
                                <Panel.Body>
                                    <form onSubmit={this.handleSubmit.bind(this,this.props.commentId, this.props.reply.from, this.props.currentUser)}>
                                        <FormGroup controlId="replycommentsubmit">
                                            <FormControl 
                                                type="text" 
                                                placeholder="发表评论" 
                                                inputRef={ref => { this.replycommentinput = ref; }}
                                            />
                                            <Button type="submit">发表</Button>
                                        </FormGroup>
                                    </form>
                                </Panel.Body>
                            </Panel.Collapse>
                        </Panel>
                    </div>                    
                    <Divider />
                </div>
            )
    }
}