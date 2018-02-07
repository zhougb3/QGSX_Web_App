import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import NavigationBar from '../components/NavigationBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Button } from 'react-bootstrap';

// App component - represents the whole app
export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scrollTop: 0
        };
    }
    componentWillMount() {
        window.addEventListener('scroll', this.handleScroll);
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }
    handleScroll = () => this.setState({scrollTop: $(window).scrollTop()});

    scrollToTop() {
        $(window).animate({scrollTop: 0}, 1000);
    }
    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <NavigationBar />
                    <div style={{height: 80}}/>
                    {this.props.children}
                    {this.state.scrollTop > 100 && <Button style={styles.backToTopButton}><a href="#" onClick={this.scrollToTop}>↑</a></Button>}
                </div>
            </MuiThemeProvider>
        );
    }
}

const styles = {
    backToTopButton: {
        position: "fixed",
        right: 30,
        bottom: 30,
    }
}