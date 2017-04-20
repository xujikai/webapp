/**
 * Created by xxx on 2017/4/20.
 */
import {connect} from 'react-redux';
import * as actions from '../actions';
import MainPage from '../component/MainPage';

const mapStateToProps = (state) => {
    const {hotVideos} = state;
    return {
        data: hotVideos.data.message,
        isFetching: hotVideos.isFetching
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getHotVideoList: () => {
            dispatch(actions.getHotVideoList('http://lvxing.bjfantu.cn/api/hotvideo/list'))
        }
    }
};

const MainContainer = connect(mapStateToProps,mapDispatchToProps)(MainPage);

export default MainContainer;