import React,{Component,PropTypes} from 'react';
import Header from "./Header";
import '../style/base.scss'
import '../style/main.scss';

export default class MainPage extends Component{

    componentDidMount() {
        const {getHotVideoList} = this.props;
        setTimeout(function () {
            getHotVideoList();
        },1000);
    }

    render(){
        const {isFetching,data} = this.props;
        if(isFetching){
            return (<div>加载中</div>);
        }else if(!data){
            return (<div>暂无数据</div>);
        }
        return (
            <div className="component_container main_container">
                <Header title="销售录入" />
                <div className="main_tip">
                    <span className="main_tip_text">请输入您的销售业绩</span>
                </div>

                <form>
                    <div className="main_input_container">
                        <span className="main_input_des">销售金额：</span>
                        <input type="text" placeholder="请输入订单金额" value={data[0].id}/>
                    </div>
                    <div className="main_input_container">
                        <span className="main_input_des">客户姓名：</span>
                        <input type="text" placeholder="请输入客户姓名" value={data[0].label}/>
                    </div>
                    <div className="main_input_container">
                        <span className="main_input_des">客户电话：</span>
                        <input type="text" placeholder="请输入客户电话" value={data[0].videoLength}/>
                    </div>
                </form>

                <div className="main_tip">
                    <span className="main_tip_text">请选择销售的产品</span>
                </div>

                <div className="main_product_choose_container">
                    <ul className="product_choose_ul">
                        <li className="product_choose_li">
                            <span className="product_style">商品1</span>
                            <span>×</span>
                            <span>2</span>
                        </li>
                        <li className="product_choose_li">
                            <span>商品2</span>
                            <span>×</span>
                            <span>2</span>
                        </li>
                    </ul>
                </div>

                <div className="main_submit">
                    提交
                </div>
            </div>
        );
    }

}

MainPage.propTypes = {
    getHotVideoList: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
    data: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        label: PropTypes.string.isRequired,
        videoLength: PropTypes.string.isRequired
    })).isRequired
};