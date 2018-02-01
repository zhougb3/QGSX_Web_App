import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import { Image } from 'react-bootstrap';

export default class BriefQuestion extends Component {
    render() {
        return (
            <Paper style={{marignTop: 10, marginBottom: 10}} className="container">
                <div className="row">
                    <Image src="/images/image.png" circle style={{width: 40, height: 40}}/>
                    <span>Username</span>
                    <span>{this.props.question.date.toString().split(' ')[3]}</span>
                </div>
                <span className="row">{this.props.question.title}</span>
                <span className="row">{this.props.question.content}</span>
                <div className="row">
                    <span style={styles.statistic}>
                        <Image src={"images/eye.png"} style={styles.icon}/>
                        {this.props.question.view_count}
                    </span>
                    <span style={styles.statistic}> 
                        <Image src="images/comment.png" style={styles.icon}/>
                        {this.props.question.answer_count}
                    </span>
                    <span style={styles.statistic}>
                        <Image src="images/like.png" style={styles.icon}/>
                        {this.props.question.like_count}
                    </span>
                </div>
            </Paper>
        )
    }
}

const styles = {
    statistic: {
        marginRight: 16,
    },
    icon: {
        width: 16,
        marginRight: 4,
    },
}