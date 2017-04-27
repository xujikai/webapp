import React,{Component} from 'react';

import HotVideoCommentPage from './HotVideoCommentPage';

export default class HotVideoDetailPage extends Component{

    componentDidMount() {
        const {getHotCommentList} = this.props;
        setTimeout(function () {
            getHotCommentList();
        },1000);
    }

    render(){
        const {pos,item,apiBean} = this.props;
        console.log(pos);
        return(
            <div className="hot_video_detail">
                <img className="image" src={item.imageUrl}/>
                <div className="title">{item.label}</div>
                <HotVideoCommentPage apiBean={apiBean}/>
            </div>
        );
    }


}