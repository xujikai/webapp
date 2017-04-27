/**
 * Created by xxx on 2017/4/27.
 */

/**
 * 返回fetch的配置选项
 */
export const options = (params) => ({
    headers: {"Content-Type": "application/x-www-form-urlencoded"},
    method:'POST',
    body: parseParam(params)
});

/**
 * 解析请求参数
 * @param params 请求参数对象 eg: {pos:2,pageSize:10}
 * @returns {string} 用于生成fetch请求的body值  eg: pos=1&pageSize=10
 */
export const parseParam = (params) => {
    let paramStr = '';
    if(!params) return paramStr;
    for (let [k, v] of Object.entries(params)) {
        paramStr += `${k}=${v}&`;
    }
    if(paramStr.length > 0) paramStr = paramStr.slice(0,-1);
    return paramStr;
};

/**
 * 获取路径参数
 * @param search     ?pos=1&pageSize=10
 * @param name      pos
 * @returns {*}     1
 */
export const getSearchString = (search,name) => {
    const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, "i");
    const r = search.substr(1).match(reg);
    if (r) return decodeURI(r[2]);
    return null;
};