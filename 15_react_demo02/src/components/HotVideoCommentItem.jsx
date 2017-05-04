import React, {Component} from 'react';

// const item = {
//     "id": 96,
//     "content": "My classmates have been to",
//     "username": "小小小小木",
//     "objId": 211,
//     "userId": 379,
//     "addDate": 1493172807,
//     "userAvatar": "http://image.zsoftware.cn/xnxcntotndiymta5ndi1mtiwnzewnju2/2016/73baf173b9804719ba929f4643672cce.JPEG"
// };

export default class HotVideoCommentItem extends Component {

    render() {
        const {item} = this.props;

        return (
            <div className="hot_video_comment_item">
                <img className="avatar" src={item.userAvatar}/>

                <div className="right_container">
                    <div className="top_container">
                        <span className="name">{item.username}</span>
                        <span className="time">{this.getDate(item.addDate * 1000)}</span>
                    </div>
                    <div className="content">{item.content}</div>
                </div>

            </div>
        );
    }

    getDate(time) {
        const date = new Date(parseInt(time));
        let month = this.fmtNumber(date.getMonth() + 1);
        let day = this.fmtNumber(date.getDay());
        let hour = this.fmtNumber(date.getHours());
        let minutes = this.fmtNumber(date.getMinutes());
        let seconds = this.fmtNumber(date.getSeconds());
        return `${date.getFullYear()}-${month}-${day} ${hour}:${minutes}:${seconds}`;
    }

    fmtNumber(number){
        return number = number < 10 ? `0${number}` : number;
    }

}