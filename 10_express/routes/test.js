/**
 * Created by xxx on 2017/5/2.
 */

const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

// ==========================================

// 定义Schema
const KittySchema = mongoose.Schema({
    name: String
});
KittySchema.methods.speak = function () {
    const greeting = this.name ? 'Meow name is ' + this.name : 'I don\'t have a name';
    console.log(greeting);
};
KittySchema.query.byName = function (name) {
    return this.find({name: new RegExp(name, 'i')});
};

// Schema定义索引
// kittySchema.index({_id:1},{sparse:true});

// 定义Model
const KittyModel = mongoose.model('Kitty', KittySchema);
// 监听索引创建是否出错
// KittyModel.on('index',function (err) {
//    console.log(`err: ${err.message}`);
// });

// ==========================================

router.use(function (req, res, next) {
    console.log(`${req.url} --> ${Date.now()}`);
    next();
});

router.get('/save/:name', function (req, res, next) {

    // 获取请求参数
    const name = req.params.name;

    // 定义Entity
    let tomKitty = new KittyModel({name: name});
    console.log(tomKitty.name);

    // 保存数据至数据库
    tomKitty.save()
        .then(function (tom) {
            tom.speak();
        }).catch(function (err) {
        console.error(err);
    });
    // tomKitty.save(function (err,tomKitty) {
    //     if(err) return console.error(err);
    //     tomKitty.speak();
    // });

    res.send(`save ok ${name}`);
});

router.get('/get', function (req, res, next) {

    // 查询数据
    KittyModel.find()
        .then(function (kitties) {
            res.send(kitties);
        }).catch(function (err) {
        console.log(err);
    });
    // KittyModel.find(function (err, kitties) {
    //     if(err) return console.error(err);
    //     console.log(kitties);
    // });

    // 使用正则表达式
    // KittyModel.find({name:/^tom/})
    //     .then(kitties => console.log(kitties))
    //     .catch(err => console.log(err));

    // 使用Schema定义的查询方法
    // KittyModel.find().byName('tom')
    //     .then(kitties => console.log(kitties))
    //     .catch(err => console.log(err));
});

router.get('/update/:name', function (req, res, next) {

    const name = req.params.name;

    KittyModel.update({name: 'tom07'}, {name: name})
        .then(raw => console.log(raw))
        .catch(err => console.log(err));

    res.send(`update ${name} success`);
});

router.post('/update', function (req, res, next) {
    const oldName = req.body.oldName;
    const newName = req.body.newName;

    KittyModel.update({name: oldName}, {name: newName})
        .then(raw => console.log(raw))
        .catch(err => console.log(err));

    res.send(`update ${newName} success`);
});

router.get('/delete/:name', function (req, res, next) {
    const name = req.params.name;

    KittyModel.remove({name: name})
        .then(raw => console.log(raw))
        .catch(err => console.log(err));

    res.send(`remove ${name} success`);
});

// ==========================================

const PersonSchema = mongoose.Schema({
    _id: Number,
    name: String,
    age: Number,
    stories: [{type: mongoose.Schema.Types.ObjectId, ref: 'Story'}]
});

const StorySchema = mongoose.Schema({
    _creator: {type: Number, ref: 'Person'},
    title: String,
    fans: [{type: Number, ref: 'Person'}]
});

const Person = mongoose.model('Person', PersonSchema);
const Story = mongoose.model('Story', StorySchema);

router.get('/population/save', function (req, res, next) {

    const aaron = new Person({_id: 5, name: 'Mark', age: 33});
    const story1 = new Story({
        title: 'Mark upon a timex.',
        _creator: aaron._id
    });

    aaron.stories.push(story1);
    aaron.save().then(() => {
        story1.save().catch(err => console.log(err));
    }).catch(err => console.log(err));

    res.send('ok');
});

router.get('/population/delete',function (req, res, next) {

    Story.deleteOne({title:'Mark upon a timex.'})
        .then(result => console.log(result))
        .catch(err => console.log(err));

    res.send('ok');
});

router.get('/population/get',function (req, res, next) {

    // Story
    //     .findOne({title:'Once upon a timex.'})
    //     .populate({
    //         path: 'fans',
    //         match: { age: { $gte: 21 }}, // 匹配满足条件数据
    //         select: 'name -_id', // 选择输出字段
    //         options: { limit: 5 } // 限制最多条数
    //     })
    //     .then(story => {
    //         console.log(story._creator.name);
    //         console.log(story.fans);
    //         console.log(story.fans[0].name);
    //     })
    //     .catch(err => console.log(err));

    Person
        .findOne({ name: 'Mark' })
        .populate('stories') // only works if we pushed refs to children
        .then(person => console.log(person))
        .catch(err => console.log(err));

    res.send('ok');
});

module.exports = router;
