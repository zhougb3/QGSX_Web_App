import React, { Component } from 'react';
import { Nav, Navbar, NavItem, NavDropdown, MenuItem, Image, Form, FormGroup, Button, ControlLabel } from 'react-bootstrap';
import { Router, Route, Link } from 'react-router'
import {browserHistory} from 'react-router';
import { withTracker } from 'meteor/react-meteor-data';

class NavigationBar extends Component {
    
    handleSubmit() {
        var fun = (err)=> {
            if (err) {
                console.log(err.reason);
            } else {
                console.log("退出成功！");
                browserHistory.push('/');
            } 
        }
        Meteor.logout(fun.bind(this));
    }
    
    render() {
        
        // if (Meteor.user()) {
        //     Meteor.subscribe('UserInformation',Meteor.user().username);
        // }
        
        return (
            <Navbar collapseOnSelect fixedTop={true}>
                <Navbar.Header>
                    <Navbar.Brand>
                    <a href="/" style={{color: "rgb()"}}>勤工善学</a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <NavItem eventKey={1} href="/">
                            优质文章
                        </NavItem>
                        <NavItem eventKey={2} href="http://ctex.math.org.cn/blackboard.html">
                            公式黑板
                        </NavItem>
                        <NavItem eventKey={3} href="/question">
                            问答
                        </NavItem>
                    </Nav>
                    <Nav pullRight>
                        <NavDropdown eventKey={3} title={<Image src="/images/image.png" width={40} circle/>} id="basic-nav-dropdown">
                            <MenuItem eventKey={3.1} href="/">主页</MenuItem>
                            <MenuItem eventKey={3.2} href="/like">我喜欢的文章</MenuItem>
                            <MenuItem eventKey={3.3} href="/store">我收藏的文章</MenuItem>
                            <MenuItem divider />
                            <MenuItem eventKey={3.3} onClick = {this.handleSubmit.bind(this)}>退出登录</MenuItem>
                        </NavDropdown>
                        {Meteor.user() ? 
                            <Navbar.Text>
                                {this.props.currentUser.username} 
                            </Navbar.Text>    
                                :
                            <NavItem eventKey={1} href="/registerLogin">
                                登录
                            </NavItem>      
                        }
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default withTracker(() => {
    if (Meteor.user()) {
        Meteor.subscribe('UserInformation', Meteor.user().username);
    }
    return {
        currentUser: Meteor.user(),
    };
})(NavigationBar);
