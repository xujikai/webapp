/**
 * Created by xxx on 2017/4/26.
 */
import * as types from '../constants/ActionTypes';

const initStatus = {
    data: [],
    result: 0,
    msg: '',
    isFetching: false,
};

const hotComment = (state = initStatus, action) => {
    switch (action.type){
        case types.REQUEST_HOT_COMMENT:
            if(action.status === types.STATUS_LOADING){
                return {
                    ...state,
                    isFetching: true
                }
            }else if(action.status === types.STATUS_SUCCESS){
                return {
                    ...state,
                    isFetching: false,
                    result: action.json.result,
                    data: action.json.data
                }
            }else if(action.status === types.STATUS_FAILED){
                return {
                    ...state,
                    isFetching: false,
                    result: action.json.result,
                    msg: action.json.msg
                }
            }else if(action.status === types.STATUS_ERROR){
                return {
                    ...state,
                    isFetching: false,
                    result: action.error.result,
                    msg: action.error.msg
                }
            }else {
                return state;
            }
        default:
            return state;
    }
};

export default hotComment;