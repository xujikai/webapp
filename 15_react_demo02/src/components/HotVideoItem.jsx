import React,{Component} from 'react';

export default class HotVideoItem extends Component{

    render(){
        const {item} = this.props;

        return(
            <div className="hot_video_item">
                <img className="image" src={item.imageUrl}/>
                <div className="bottom_container">
                    <span className="duration">{item.videoLength}</span>
                    <span className="play_count">{item.playCount}</span>
                </div>
            </div>
        );
    }

}