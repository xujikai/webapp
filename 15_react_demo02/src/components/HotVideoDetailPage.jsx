import React,{Component} from 'react';

const item = {
    "id": 258,
    "userName": null,
    "userId": 1,
    "squareName": "",
    "videoLocation": "",
    "imageUrl": "http://image.zsoftware.cn/xnxcntotndiymta5ndi1mtiwnzewnju2/2017/94d79bf7542c4e219f9840424cc6e99c.jpg",
    "videoTitle": "",
    "lng": "-73.832134",
    "lat": "40.814734",
    "isTop": 0,
    "orderNo": 197,
    "squareId": null,
    "label": "全球最著名的自杀圣地",
    "playCount": 1904,
    "videoUrl": "http://v.zsoftware.cn/1492237134298.mp4",
    "likeCount": 1,
    "addDate": 1492238080,
    "commentCount": 0,
    "avatarUrl": null,
    "descriptions": "",
    "imageUrl2": "http://v.zsoftware.cn/xnxcntotndiymta5ndi1mtiwnzewnju2/2017/f14dbd1de933426f90472160294e04e8.mp4?vframe/jpg/offset/2",
    "videoLength": "2'23\""
};

export default class HotVideoDetailPage extends Component{

    render(){
        return(
            <div className="hot_video_detail">
                <img className="image" src={item.imageUrl}/>
                <div className="title">{item.label}</div>
            </div>
        );
    }

}