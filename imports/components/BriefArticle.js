import React, { Component } from 'react';
import { Image } from 'react-bootstrap';

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
            <div className="container">
                <div className="row">
                    <span style={styles.title}>{this.props.title}</span>
                </div>
                <div className="row">
                    <span>{this.props.content}</span>
                </div>
                <span>{this.props.date.toString().split(' ')[3]}</span>
                
                <span>
                    <Image src={"images/eye.png"}/>
                    {this.props.view_count}
                </span>
                <span>
                    <Image src="images/comment.png"/>
                    {this.props.comment_count}
                </span>
                <span>
                    <Image src="images/like.png"/>
                    {this.props.like_count}
                </span>
                <Image src={this.props.image_src} style={styles.coverImage}/>
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
    }
}