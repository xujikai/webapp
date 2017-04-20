/**
 * Created by xxx on 2017/4/20.
 */

// http://lvxing.bjfantu.cn/api/hotvideo/list?page=1
/**
 * get请求
 */
const getHotVideoList = (path) => (dispatch) => {
    dispatch(requestPosts(path));
    return fetch(path)
        .then(response => response.json())
        .then(json => dispatch(receivePosts(path,json)));
};

/**
 * post请求
 */
const getHotVideoList = (path) => (dispatch) => {
    dispatch(requestPosts(path));
    return fetch(path,{
            headers: {"Content-Type": "application/x-www-form-urlencoded"},
            method:'POST',
            body: parseParam({page:3,pagesize:5})
        }).then(response => {
            if(response.ok){
                response.json().then(json => dispatch(receivePosts(path,json)));
            }else {
                //在此可以发送错误action
                console.log(`请求错误，状态码：${response.status}`);
            }
        }).catch(error => console.log(error));
};

/**
 * 解析请求参数
 * 例如：page=1&pagesize=5
 */
const parseParam = (params) => {
    let paramStr = '';
    for (let [k, v] of Object.entries(params)) {
        paramStr += `${k}=${v}&`;
    }
    if(paramStr.length > 0) paramStr = paramStr.slice(0,-1);
    return paramStr;
};