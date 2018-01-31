import React, { Component } from 'react';
import { Nav, Navbar, NavItem, NavDropdown, MenuItem, Image, Form, FormGroup, Button, ControlLabel } from 'react-bootstrap';
import { Router, Route, Link } from 'react-router'

export default class NavigationBar extends Component {
    render() {
        return (
            <Navbar collapseOnSelect fixedTop={true}>
                <Navbar.Header>
                    <Navbar.Brand>
                    <a href="#brand" style={{color: "rgb()"}}>勤工善学</a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <NavItem eventKey={1} href="/articlePage">
                            文章
                        </NavItem>
                        <NavItem eventKey={2} href="/questionPage">
                            问答
                        </NavItem>
                        <NavItem eventKey={3} href="/formulaPage">
                            公式板
                        </NavItem>
                    </Nav>
                    <Nav pullRight>
                        <NavDropdown eventKey={3} title={<img src="images/image.png" width={30}/>} id="basic-nav-dropdown">
                            <MenuItem eventKey={3.1}>Action</MenuItem>
                            <MenuItem eventKey={3.2}>Another action</MenuItem>
                            <MenuItem eventKey={3.3}>Something else here</MenuItem>
                            <MenuItem divider />
                            <MenuItem eventKey={3.3}>Separated link</MenuItem>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}