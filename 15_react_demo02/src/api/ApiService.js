/**
 * Created by xxx on 2017/4/25.
 */

import * as types from '../constants/ActionTypes';
import * as actions from '../actions';

/**
 * 请求热门视频列表
 */
export const getHotVideo = () => (dispatch) => {
  dispatch(actions.getHotVideo(types.STATUS_LOADING));
  return fetch('http://192.168.0.92:3000/api/hotVideo/list',{
      headers: {"Content-Type": "application/x-www-form-urlencoded"},
      method:'POST',
      body: parseParam({page:3,pagesize:5})
  }).then(response => {
      if(response.ok){
          response.json().then(json => {
              if(json.result === 200){
                  dispatch(actions.getHotVideo(types.STATUS_SUCCESS,json,null));
              }else {
                  dispatch(actions.getHotVideo(types.STATUS_FAILED,null,json.msg));
              }
          })
      }else {
          dispatch(actions.getHotVideo(types.STATUS_FAILED,null,`getHotVideo failed : ${response.status}`));
      }
  }).catch(error => dispatch(actions.getHotVideo(types.STATUS_FAILED,null,`getHotVideo error : ${error}`)));
};

/**
 * 解析请求参数
 */
const parseParam = (params) => {
    let paramStr = '';
    for (let [k, v] of Object.entries(params)) {
        paramStr += `${k}=${v}&`;
    }
    if(paramStr.length > 0) paramStr = paramStr.slice(0,-1);
    return paramStr;
};