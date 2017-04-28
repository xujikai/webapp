/**
 * Created by xxx on 2017/4/25.
 */

parseParam(null);
parseParam({});
parseParam({a:3,b:'haha'});

const parseParam = (params) => {
    let paramStr = '';
    if(!params) return paramStr;
    for (let [k, v] of Object.entries(params)) {
        paramStr += `${k}=${v}&`;
    }
    if(paramStr.length > 0) paramStr = paramStr.slice(0,-1);
    return paramStr;
};


const str = '?pos=1&key=%E5%93%88%E5%93%88';

const getSearchString = (search,name) => {
    const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, "i");
    const r = search.substr(1).match(reg);
    console.log(r);
    if (r) return decodeURI(r[2]);
    return null;
};

getSearchString(str,'pos');