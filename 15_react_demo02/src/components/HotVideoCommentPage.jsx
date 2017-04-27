import React, {Component} from 'react';
import * as ApiCode from '../api/ApiCode';

import HotVideoCommentItem from './HotVideoCommentItem';

export default class HotVideoCommentPage extends Component {

    render() {
        const {isFetching, result, msg, data} = this.props.apiBean;

        if(isFetching){
            return <div>加载中</div>;
        }else if(result !== ApiCode.CODE_SUCCESS){
            return <div>{msg}</div>;
        }else {
            return(
                <div>
                    {data.map((item, index) => {
                        return <HotVideoCommentItem key={index} item={item} pos={index}/>
                    })}
                </div>
            );
        }
    }

}