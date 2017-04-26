import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import * as RouteUrl from '../constants/RouteUrl';

export default class HotVideoItem extends Component {

    render() {
        const {item} = this.props;

        return (
            <Link to={RouteUrl.HotVideoDetail}>
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