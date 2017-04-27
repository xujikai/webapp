/**
 * Created by xxx on 2017/4/26.
 */
import * as types from '../constants/ActionTypes';

const initStatus = {
    data: [],// 结果数据
    result: 0,// 结果码
    msg: '',// 错误信息
    isFetching: false,// 是否正在请求
    lastUpdate: 0,// 上次数据请求时间
    isForceUpdate: false// 是否强制刷新
};

const hotVideo = (state = initStatus,action) => {
    switch (action.type){
        case types.REQUEST_HOT_VIDEO://请求视频列表
            if(action.status === types.STATUS_LOADING){
                return {
                    ...state,
                    isFetching: true,
                    isForceUpdate: false
                };
            }else if(action.status === types.STATUS_SUCCESS){
                return {
                    ...state,
                    isFetching: false,
                    result: action.json.result,
                    data: action.json.data,
                    lastUpdate: action.lastUpdate
                };
            }else if(action.status === types.STATUS_FAILED){
                return {
                    ...state,
                    isFetching: false,
                    result: action.json.result,
                    msg: action.json.msg
                };
            }else if(action.status === types.STATUS_ERROR){
                return {
                    ...state,
                    isFetching: false,
                    result: action.error.result,
                    msg: action.error.msg
                }
            }else if(action.status === types.STATUS_UPDATE){
                return {
                    ...state,
                    isForceUpdate: true
                }
            }else {
                return state;
            }
        default:
            return state;
    }
};

export default hotVideo;