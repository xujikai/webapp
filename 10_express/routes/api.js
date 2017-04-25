/**
 * Created by xxx on 2017/4/25.
 */
const express = require('express');
const router = express.Router();

const hotVideoEntity = require('../data/hotVideo.json');

// 该路由使用的中间件
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});

// 获取热门视频列表
// http://lvxing.bjfantu.cn/api/hotvideo/list
router.post('/hotVideo/list', function(req, res, next) {
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Methods','POST');
    res.header('Access-Control-Allow-Headers','x-requested-with,content-type');
    res.send(hotVideoEntity);
});

// 添加评论
// http://lvxing.bjfantu.cn/api/hotvideo/addCmmt
// videoId:211
// userId:379
// content:My classmates have been to

module.exports = router;