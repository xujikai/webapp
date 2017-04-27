/**
 * Created by xxx on 2017/4/26.
 */

const BaseUrl = 'http://192.168.0.92:3000';

export const HotVideo = `${BaseUrl}/api/hotVideo/list`;
export const HotComment = `${BaseUrl}/api/hotVideo/commentList`;

// /**
//  * 返回fetch的配置选项
//  */
// export const options = (params) => ({
//     headers: {"Content-Type": "application/x-www-form-urlencoded"},
//     method:'POST',
//     body: parseParam(params)
// });
//
// /**
//  * 解析请求参数
//  */
// const parseParam = (params) => {
//     let paramStr = '';
//     if(!params) return paramStr;
//     for (let [k, v] of Object.entries(params)) {
//         paramStr += `${k}=${v}&`;
//     }
//     if(paramStr.length > 0) paramStr = paramStr.slice(0,-1);
//     return paramStr;
// };
