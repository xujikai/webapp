import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import * as RouteUrl from '../constants/RouteUrl';

export default class HotVideoItem extends Component {

    render() {
        const {pos,item} = this.props;

        return (
            <Link to={{pathname:RouteUrl.HotVideoDetail,search:`?pos=${pos}`}}>
                <div className="hot_video_item">
                    <img className="image" src={item.imageUrl}/>
                    <div className="bottom_container">
                        <span className="duration">{item.videoLength}</span>
                        <span className="play_count">{item.playCount}</span>
                    </div>
                </div>
            </Link>
        );
    }

}