import React,{Component} from 'react';

const item = {
    imageUrl: "http://image.zsoftware.cn/xnxcntotndiymta5ndi1mtiwnzewnju2/2017/e022e94b16ff44d985f0819cb6f53f0c.jpg",
    title: "日本艺伎是性工作者吗？",
    playCount: 1370
};

export default class HotVideoDetail extends Component{
    render(){
        return(
            <div className="transition-item">
                <img src={item.imageUrl} style={{
                    width:'100%',height:'198px'
                }}/>
            </div>
        );
    }
}