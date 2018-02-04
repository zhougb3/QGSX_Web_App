import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import ArticleList from '../components/ArticleList';
import { Image, Tab, Nav, Row, Col, NavItem } from 'react-bootstrap';
import Divider from 'material-ui/Divider';

class Profile extends Component {
    componentdidMount() {
        if (!Meteor.user()) {
            console.log("dfdfdf");
            browserHistory.push('/RegisterLogin');
        }
    }
    render() {
        return (
            <div className="container-fluid">
                <div className="col-md-2 col-xs-1"/>
                
                <div className="col-md-8 col-xs-10 container-fluid">
                    <div className="row container-fluid">
                        <div className="col-md-2 col-xs-3">
                            <Image src="/images/image.png" circle style={{width: "100%"}}/>
                        </div>
                        <div className="col-md-10 col-xs-9 container-fluid">
                            <div className="row">{this.props.currentUser && this.props.currentUser.username}</div>
                            <div className="row">关注 | {""}</div>
                        </div>
                    </div>
                    <Divider className="row" style={{marginTop: 16}}/>
                    <Tab.Container defaultActiveKey="first" className="container-fluid col-md-12 col-xs-12">
                        <Row className="clearfix col-md-12 col-xs-12 container-fluid">
                            <Nav bsStyle="pills">
                                <NavItem eventKey="first" >我的收藏</NavItem>
                                <NavItem eventKey="second">我的赞</NavItem>
                            </Nav>
                            <Tab.Content animation className="col-md-12 col-xs-12 container-fluid" style={{marginLeft: -15, marginRight: -15}}>
                                <Tab.Pane eventKey="first" className="col-md-12 col-xs-12 container-fluid" style={{marginLeft: -15, marginRight: -15}}>
                                    <ArticleList articles={[]} />
                                </Tab.Pane>
                                <Tab.Pane eventKey="second"className="col-md-12 col-xs-12 container-fluid" style={{marginLeft: -15, marginRight: -15}}>
                                    <ArticleList articles={[]} />
                                </Tab.Pane>
                            </Tab.Content>
                        </Row>
                    </Tab.Container>
                </div>
                
                <div className="col-md-2 col-xs-1"/>
            </div>
        )
    }
}

export default withTracker(() => {
    return {
        currentUser: Meteor.user(),
    }
})(Profile);