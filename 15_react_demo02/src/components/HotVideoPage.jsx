import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import * as ApiCode from '../api/ApiCode';
import * as RouteUrl from '../constants/RouteUrl';

import HotVideoItem from './HotVideoItem';

export default class HotVideoPage extends Component{

    componentDidMount() {
        const {getHotVideoList} = this.props;
        setTimeout(function () {
            getHotVideoList();
        },1000);
    }

    render(){
        const {isFetching,result,msg,data} = this.props.apiBean;

        if(isFetching){
            return <div>加载中</div>;
        }else if(result !== ApiCode.CODE_SUCCESS){
            return <div>{msg}</div>;
        }else {
            return(
                <div>
                    <Link to={RouteUrl.Test}>Test页面</Link>
                    <Link to={RouteUrl.Main}>Main页面</Link>
                    {data.map((item,index) => {
                        return <HotVideoItem key={index} item={item} pos={index}/>
                    })}
                </div>
            );
        }
    }

}