import React,{Component} from 'react';

const item = {
    "id": 96,
    "content": "My classmates have been to",
    "username": "小小小小木",
    "objId": 211,
    "userId": 379,
    "addDate": 1493172807,
    "userAvatar": "http://image.zsoftware.cn/xnxcntotndiymta5ndi1mtiwnzewnju2/2016/73baf173b9804719ba929f4643672cce.JPEG"
};

export default class HotVideoCommentItem extends Component{

    render(){
        return (
            <div className="hot_video_comment_item">
                <div className="top_container">
                    <img className="avatar" src={item.userAvatar}/>
                    <span className="time">{item.addDate}</span>
                </div>
                <div className="content">
                    {item.content}
                </div>
            </div>
        );
    }

}