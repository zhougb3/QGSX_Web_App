import React, { Component } from 'react';
import { Image, Badge, Glyphicon } from 'react-bootstrap';
import {browserHistory} from 'react-router';

export default class BriefArticle extends Component {

    constructor(props) {
        super(props);
        this.state = {
            width: props.width || -1,
            height: props.height || -1,
        }
    }
       
    componentDidMount() {
        this.updateSize();
        window.addEventListener('resize', () => this.updateSize());
    }

    componentWillUnmount() {
        window.removeEventListener('resize', () => this.updateSize());
    }

    skip () {
        browserHistory.push('/article/' + this.props.title);
    }
    
    updateSize() {
        try {
            const parentDom = ReactDOM.findDOMNode(this).parentNode;
            let { width, height } = this.props;
            //如果props没有指定height和width就自适应
            if (!width) {
                width = parentDom.offsetWidth;
            }
            if (!height) {
                height = width * 0.5;
            }
            this.setState({ width, height });
        } catch (ignore) {}
    }

    render() {
        return (
            <div className="container" onClick={this.skip.bind(this)}>
                <div className="col-md-3">
                    <Image className="image-responsive" src={this.props.image_src} style={styles.coverImage}/>
                </div>
                <div className="col-md-6">
                    <div className="row">
                        <span style={styles.title}>{this.props.title}</span>
                    </div>
                    <div className="row">
                        <span>{this.props.content}</span>
                    </div>
                    <div className="row">
                        <span style={styles.statistic}>
                            <Image src={"images/eye.png"} style={styles.icon}/>
                            {this.props.view_count}
                        </span>
                        <span style={styles.statistic}> 
                            <Image src="images/comment.png" style={styles.icon}/>
                            {this.props.comment_count}
                        </span>
                        <span style={styles.statistic}>
                            <Image src="images/like.png" style={styles.icon}/>
                            {this.props.like_count}
                        </span>
                        <Badge>{this.props.date.toString().split(' ')[3]}</Badge>
                    </div>
                    <div className="row" style={styles.blank}/>
                </div>
            </div>
        )
    }
}

const styles = {
    container: {

    },
    title: {
        fontSize: 40,
    },
    coverImage: {
        width: 200,
    },
    icon: {
        width: 16,
        marginRight: 4,
    },
    statistic: {
        marginRight: 16,
    },
    blank: {
        height: 15,
    }
}