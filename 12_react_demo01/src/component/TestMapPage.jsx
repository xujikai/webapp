import React, {Component} from 'react';

import '../style/test_map.scss'

export default class TestMapPage extends Component {

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            map : null
        };
    }

    componentDidMount() {
        const script = document.createElement("script");
        script.src = "http://api.map.baidu.com/api?v=2.0&ak=eMSzu5e5eVwcfoonfDRGlc4ouXZBFIYV";
        script.type = "text/javascript";
        script.async = true;
        document.head.appendChild(script);
        script.onload = function () {
            // 百度地图API功能
            const map = new BMap.Map("allmap");    // 创建Map实例
            map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);  // 初始化地图,设置中心点坐标和地图级别
            map.addControl(new BMap.MapTypeControl());   //添加地图类型控件
            map.setCurrentCity("北京");          // 设置地图显示的城市 此项是必须设置的
            map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
            const that = this;

            setTimeout(() => that.addMarker(map),2000);
        };
    }

    render() {
        return (
            <div id="allmap">

            </div>
        );
    }

    /**
     * 添加覆盖物
     */
    addMarker(map) {
        const point = new BMap.Point(116.521, 39.912);
        map.centerAndZoom(point, 15);
        const marker = new BMap.Marker(point);  // 创建标注
        map.addOverlay(marker);               // 将标注添加到地图中
        marker.setAnimation(Animation.BMAP_ANIMATION_BOUNCE); //跳动的动画
    }

}