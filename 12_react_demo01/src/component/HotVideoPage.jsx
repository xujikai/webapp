import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import ActionHome from 'material-ui/svg-icons/action/home';
import {List, ListItem} from 'material-ui/List';

import HotVideoItem from './HotVideoItem';

const titles = [
    {
        imageUrl: "http://image.zsoftware.cn/xnxcntotndiymta5ndi1mtiwnzewnju2/2017/94d79bf7542c4e219f9840424cc6e99c.jpg",
        title: "全球最著名的自杀圣地",
        playCount: 357
    },
    {
        imageUrl: "http://image.zsoftware.cn/xnxcntotndiymta5ndi1mtiwnzewnju2/2017/aa4f6381edbe4f0393012096af8943ab.jpg",
        title: "靠女人干体力活的村庄长啥样",
        playCount: 3701
    },
    {
        imageUrl: "http://image.zsoftware.cn/xnxcntotndiymta5ndi1mtiwnzewnju2/2017/e022e94b16ff44d985f0819cb6f53f0c.jpg",
        title: "日本艺伎是性工作者吗？",
        playCount: 1370
    },
    {
        imageUrl: "http://image.zsoftware.cn/xnxcntotndiymta5ndi1mtiwnzewnju2/2017/3f43ec9efde04ac1b4692496de9665c0.jpg",
        title: "哈拉湖——秘境穿越",
        playCount: 1140
    },
    {
        imageUrl: "http://image.zsoftware.cn/xnxcntotndiymta5ndi1mtiwnzewnju2/2017/0b8955b90650481493b8027bd6f41293.jpg",
        title: "世界上地价最高的贫民窟",
        playCount: 1328
    },
];

export default class HotVideoPage extends Component {

    render() {
        console.log(browserHistory);

        return (
            <div className="transition-item simple_exit">
                <AppBar
                    title="热门视频"
                    iconElementLeft={<IconButton><NavigationClose /></IconButton>}
                    iconElementRight={<IconButton><ActionHome  /></IconButton>}
                    onLeftIconButtonTouchTap={() => browserHistory.goBack()}
                    titleStyle={{
                        textAlign: 'center',
                        fontSize: '1.2rem'
                    }}
                    style={{
                        backgroundColor: 'rgba(0,0,0,0.6)'
                    }}
                />
                <List>
                {
                    titles.map((item,index) => {
                        return <ListItem innerDivStyle={{padding:0}}><HotVideoItem key={index} item={item}/></ListItem>
                    })
                }
                </List>
            </div>

        );
    }

}