/**
 * Created by xxx on 2017/4/25.
 */
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const hotVideoEntity = require('../data/hotVideo.json');
const commentEntity = require('../data/hotComment.json');

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

// 评论列表
// http://lvxing.bjfantu.cn/api/hotvideo/cmmtList
// videoId:211
router.post('/hotVideo/commentList', function (req, res, next) {
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Methods','POST');
    res.header('Access-Control-Allow-Headers','x-requested-with,content-type');
    res.send(commentEntity);
});

// 添加评论
// http://lvxing.bjfantu.cn/api/hotvideo/addCmmt
// videoId:211
// userId:379
// content:My classmates have been to
router.post('/hotVideo/addComment',function (req, res, next) {
    // const userId = req.param('userId');
    // const videoId = req.param('videoId');
    // console.log(`${userId} == ${videoId}`);
    const params = req.body;
    console.log(`${params.userId} == ${params.videoId}`);

    const result = {
        data:'',
        result:200,
        msg:'评论成功'
    };
    res.send(result);
});

// 删除评论
// http://lvxing.bjfantu.cn/api/hotvideo/deleteCmmt
// userId:379
// commentId:79
router.post('/hotVideo/delComment',function (req, res, next) {
    const result = {
        data:'',
        result:200,
        msg:'删除成功'
    };
    res.send(result);
});


module.exports = router;