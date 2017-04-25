/**
 * Created by xxx on 2017/4/25.
 */
import * as types from '../constants/ActionTypes';
import {combineReducers} from 'redux';

const initHotVideo = {
    data: [],
    result: 0,
    msg: '',
    isFetching: false,
};

const hotVideo = (state = initHotVideo,action) => {
  switch (action.type){
      case types.REQUEST_HOT_VIDEO://请求视频列表
          if(action.status === types.STATUS_LOADING){
              return {
                  ...state,
                  isFetching: true
              };
          }else if(action.status === types.STATUS_SUCCESS){
              return {
                  ...state,
                  isFetching: false,
                  result: action.json.result,
                  data: action.json.data,
              };
          }else if(action.status === types.STATUS_FAILED){
              return {
                  ...state,
                  isFetching: false,
                  result: action.json.result,
                  msg: action.json.msg
              };
          }else {
              return state;
          }
      default:
          return state;
  }
};

const reducer = combineReducers({
    hotVideo
});

export default reducer;