/**
 * Created by xxx on 2017/4/20.
 */
import * as types from '../constants/ActionTypes';
import {baseUrl} from '../constants/Config';

const requestPosts = path => ({
    type: types.REQUEST_POSTS,
    path
});

const receivePosts = (path,json) => ({
    type: types.RECEIVE_POSTS,
    path,
    json
});

/**
 * 获取热门视频列表
 */
// http://lvxing.bjfantu.cn/api/hotvideo/list?page=1
// export const getHotVideoList = (path) => (dispatch) => {
//     dispatch(requestPosts(path));
//     setTimeout(function () {
//         return fetch(path)
//             .then(response => response.json())
//             .then(json => dispatch(receivePosts(path,json)));
//     },2000);
// };

export const getHotVideoList = (path) => (dispatch) => {
    dispatch(requestPosts(path));
    setTimeout(function () {
        return fetch(path,{
            headers: {"Content-Type": "application/x-www-form-urlencoded"},
            method:'POST',
            body: parseParam({page:3,pagesize:5})
        })
        .then(response => response.json())
        .then(json => dispatch(receivePosts(path,json)));
    },2000);
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

export const fetchPosts = (path,postData) => {
    let url = baseUrl + path + parseParam(postData);
    return (dispatch) => {
        dispatch(requestPosts(path));
        return fetch(url,{
            mode: 'cors',
            'Content-Type': 'application/json'
        }).then(response => {
            if(response.ok){
                response.json().then(json => dispatch(receivePosts(path,json)));
            }else {
                console.log(`请求错误，状态码：${response.status}`);
            }
        }).catch(error => console.log(error));
    }
};

export const getOrderByType = (postData) => (dispatch) => {
    dispatch(requestPosts());
};
