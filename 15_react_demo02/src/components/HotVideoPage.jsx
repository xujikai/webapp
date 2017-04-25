import React,{Component} from 'react';

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
        }else if(result !== 200){
            return <div>{msg}</div>;
        }else {
            return(
                <div>
                    {data.map((item,index) => {
                        return <HotVideoItem key={index} item={item}/>
                    })}
                </div>
            );
        }
    }

}