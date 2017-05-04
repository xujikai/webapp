/**
 * 该请求一共有四种状态：
 *  loading：正在请求
 *  success：http协议200，result值200
 *  failed：http协议200，result值为其他值
 *  error：http协议为其他值
 *
 * 1.如果服务器未开启，在fetch之后直接走error。
 * 2.如果http协议返回200，直接走if(response.ok)
 *      如果result为200，则走success
 *      如果result不是200，则走failed
 * 3.如果http协议返回不是200，则走error。
 *
 * Created by xxx on 2017/4/25.
 */

import * as types from '../constants/ActionTypes';
import * as actions from '../actions';
import * as ApiUrl from './ApiUrl';
import * as ApiCode from './ApiCode';
import * as ApiUtils from './ApiUtils';
import reducer from '../reducers';

/**
 * 获取error时返回对象
 * @param result    结果状态码
 * @param msg       错误信息
 */
const getError = (result,msg) => ({
    result,
    msg
});

/**
 * 是否应该请求数据
 * @param state    当前应用状态数据      eg: {hotVideo:Object,hotComment:Object}
 * @param key      获取应用某些数据的key eg: hotVideo
 */
const isShouldUpdate = (state,key) => {
  const apiBean = state[key];
  if(apiBean.isFetching) return false;

  return apiBean.isForceUpdate //手动强制刷新
      || !apiBean.data  //数据为空
      || Date.now() - apiBean.lastUpdate > 10 * 60 * 1000; //上次更新时间大于10分钟
};

/**
 * 请求热门视频列表
 */
export const getHotVideo = () => (dispatch,getState) => {
    if(!isShouldUpdate(getState(),'hotVideo')) return;

    dispatch(actions.getHotVideo(types.STATUS_LOADING));
    const params = {page: 3, pagesize: 5};
    return fetch(ApiUrl.HotVideo, ApiUtils.options(params))
        .then(response => {
            if (response.ok) {
                response.json().then(json => {
                    const type = json.result === ApiCode.CODE_SUCCESS ? types.STATUS_SUCCESS : types.STATUS_FAILED;
                    dispatch(actions.getHotVideo(type,json));
                })
            } else {
                dispatch(actions.getHotVideo(types.STATUS_ERROR, null, getError(response.status,response.statusText)));
            }
        }).catch(error => {
            dispatch(actions.getHotVideo(types.STATUS_ERROR, null, getError(ApiCode.CODE_ERROR,error.message)));
        });
};

/**
 * 强制刷新热门视频列表
 */
export const updateHotVideo = () => (dispatch) => {
    dispatch(actions.getHotVideo(types.STATUS_UPDATE));
    dispatch(getHotVideo());
};

/**
 * 请求热门视频评论列表
 */
export const getHotComment = () => (dispatch) => {
    dispatch(actions.getHotComment(types.STATUS_LOADING));
    return fetch(ApiUrl.HotComment, ApiUtils.options(null))
        .then(response => {
            if(response.ok){
                response.json().then(json => {
                    const type = json.result === ApiCode.CODE_SUCCESS ? types.STATUS_SUCCESS : types.STATUS_FAILED;
                    dispatch(actions.getHotComment(type,json));
                })
            }else {
                dispatch(actions.getHotComment(types.STATUS_ERROR, null, getError(response.status,response.statusText)));
            }
        }).catch(error => {
            dispatch(actions.getHotComment(types.STATUS_ERROR,null, getError(ApiCode.CODE_ERROR,error.message)));
        });
};

// export const getHotVideo = () => (dispatch) => {
//   dispatch(actions.getHotVideo(types.STATUS_LOADING));
//   return fetch(ApiUrl.HotVideo,{
//       headers: {"Content-Type": "application/x-www-form-urlencoded"},
//       method:'POST',
//       body: parseParam({page:3,pagesize:5})
//   }).then(response => {
//       if(response.ok){
//           response.json().then(json => {
//               if(json.result === 200){
//                   dispatch(actions.getHotVideo(types.STATUS_SUCCESS,json,null));
//               }else {
//                   dispatch(actions.getHotVideo(types.STATUS_FAILED,null,json.msg));
//               }
//           })
//       }else {
//           dispatch(actions.getHotVideo(types.STATUS_FAILED,null,`getHotVideo failed : ${response.status}`));
//       }
//   }).catch(error => dispatch(actions.getHotVideo(types.STATUS_FAILED,null,`getHotVideo error : ${error}`)));
// };