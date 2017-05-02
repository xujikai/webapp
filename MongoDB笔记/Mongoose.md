## 概述
在 sql 中，我们的数据层级是：数据库（db） -> 表（table） -> 记录（record）-> 字段；<br/>
在 mongodb 中，数据的层级是：数据库 -> collection -> document -> 字段。

### Schemas

#### > 定义Schemas

    var mongoose = require('mongoose');
    var Schema = mongoose.Schema;

    var BlogSchema = new Schema({
      title:  String,
      author: String,
      body:   String,
      comments: [{ body: String, date: Date }],
      date: { type: Date, default: Date.now },
      hidden: Boolean,
      meta: {
        votes: Number,
        favs:  Number
      }
    });

支持的数据类型

    String
    Number
    Date
    Buffer
    Boolean
    Mixed
    ObjectId
    Array

#### > 创建Model

    var Blog = mongoose.model('Blog', blogSchema);

#### > 实例方法

    // 定义一个Schema
    var AnimalSchema = new Schema({ name: String, type: String });

    // 定义一个方法，在Schema的methods对象下面
    AnimalSchema.methods.findSimilarTypes = function(cb) {
      return this.model('Animal').find({ type: this.type }, cb);
    };

现在，我们的animal实例就具有该方法并且可以使用它。

    var Animal = mongoose.model('Animal', AnimalSchema);
    var dog = new Animal({ type: 'dog' });

    dog.findSimilarTypes(function(err, dogs) {
      console.log(dogs); // woof
    });

#### > 静态方法

    // assign a function to the "statics" object of our animalSchema
    AnimalSchema.statics.findByName = function(name, cb) {
      return this.find({ name: new RegExp(name, 'i') }, cb);
    };

    var Animal = mongoose.model('Animal', animalSchema);
    Animal.findByName('fido', function(err, animals) {
      console.log(animals);
    });

#### > 定义查询语句

    AnimalSchema.query.byName = function(name) {
      return this.find({ name: new RegExp(name, 'i') });
    };

    var Animal = mongoose.model('Animal', animalSchema);
    Animal.find().byName('fido').exec(function(err, animals) {
      console.log(animals);
    });

#### > 定义索引

    var AnimalSchema = new Schema({
      name: String,
      type: String,
      tags: { type: [String], index: true } // 字段中定义
    });

    AnimalSchema.index({ name: 1, type: -1 }); // Schema中定义

当你的应用启动时，Mongoose自动调用ensureIndex方法创建索引，这在开发环境中是非常好的。
但是在生产环境下，要避免此操作，因为定义索引非常的耗时。

    mongoose.connect('mongodb://user:pass@localhost:port/database', { config: { autoIndex: false } });
    // or
    mongoose.createConnection('mongodb://user:pass@localhost:port/database', { config: { autoIndex: false } });
    // or
    AnimalSchema.set('autoIndex', false);
    // or
    new Schema({..}, { autoIndex: false });

Mongoose可以通过on事件监听创建索引是否发生异常

    // 将会发生异常，因为MongoDb默认会有_id的索引
    AnimalSchema.index({ _id: 1 }, { sparse: true });
    var Animal = mongoose.model('Animal', animalSchema);

    Animal.on('index', function(error) {
      // "_id index cannot be sparse"
      console.log(error.message);
    });

### Queries(查询)
查询推荐两种方式，一种是json文档，一种是query对象。

    // With a JSON doc
    Person.
      find({
        occupation: /host/,
        'name.last': 'Ghost',
        age: { $gt: 17, $lt: 66 },
        likes: { $in: ['vaporizing', 'talking'] }
      }).
      limit(10).
      sort({ occupation: -1 }).
      select({ name: 1, occupation: 1 }).
      exec(callback);

    // Using query builder
    Person.
      find({ occupation: /host/ }).
      where('name.last').equals('Ghost').
      where('age').gt(17).lt(66).
      where('likes').in(['vaporizing', 'talking']).
      limit(10).
      sort('-occupation').
      select('name occupation').
      exec(callback);

### Population(关系)

    var mongoose = require('mongoose')
      , Schema = mongoose.Schema

    var PersonSchema = Schema({
      _id     : Number,
      name    : String,
      age     : Number,
      stories : [{ type: Schema.Types.ObjectId, ref: 'Story' }]
    });

    var StorySchema = Schema({
      _creator : { type: Number, ref: 'Person' },
      title    : String,
      fans     : [{ type: Number, ref: 'Person' }]
    });

    var Story  = mongoose.model('Story', StorySchema);
    var Person = mongoose.model('Person', PersonSchema);

#### > 注意

    ObjectId, Number, String, and Buffer are valid for use as refs.
    只有上述四种类型，作为refs是合法的

#### > 保存refs
保存refs和保存正常属性基本一样，唯一不同的是，要手动分配_id值。

    var aaron = new Person({ _id: 0, name: 'Aaron', age: 100 });

    aaron.save(function (err) {
      if (err) return handleError(err);

      var story1 = new Story({
        title: "Once upon a timex.",
        _creator: aaron._id    // assign the _id from the person
      });

      story1.save(function (err) {
        if (err) return handleError(err);
        // thats it!
      });
    });

#### > 查询

    Story
    .findOne({ title: 'Once upon a timex.' })
    .populate('_creator') // 该句在查询时建立关系
    .exec(function (err, story) {
      if (err) return handleError(err);
      console.log('The creator is %s', story._creator.name);
      // prints "The creator is Aaron"
    });

#### >> 注意

    the original _ids used during population
    through the document#populated() method.

#### > 手动设置关系字段

    Story.findOne({ title: 'Once upon a timex.' }, function(error, story) {
      if (error) {
        return handleError(error);
      }
      story._creator = aaron; // 此值为直接赋值
      console.log(story._creator.name); // prints "Aaron"
    });

#### >> 注意
如果关系字段为集合，则不能进行此操作

#### > 查询关系对象中的部分字段

    Story
    .findOne({ title: /timex/i })
    .populate('_creator', 'name') // 只返回Person对象的name属性
    .exec(function (err, story) {
      if (err) return handleError(err);

      console.log('The creator is %s', story._creator.name);
      // prints "The creator is Aaron"

      console.log('The creators age is %s', story._creator.age);
      // prints "The creators age is null'
    })

#### > 查询多个关系对象

    Story
    .findOne({title:'Once upon a timex.'})
    .populate('_creator fans')
    .then(story => {
        console.log(story._creator.name);
        // [{"_id":1,"name":"Bob","age":18,"stories":[]},{"_id":3,"name":"Tom","age":24,"stories":[]}]
        console.log(story.fans);
    })
    .catch(err => console.log(err))

#### > 设置查询关系对象的options

    Story
    .find(...)
    .populate({
      path: 'fans',
      match: { age: { $gte: 21 }}, // 匹配满足条件数据
      select: 'name -_id', // 选择输出字段
      options: { limit: 5 } // 限制最多条数
    })
    .exec()

#### > 保存子对象的关系
上面的例子，都是通过Story找Person，不能通过Person找Story。
下面代码解决上述问题

    const aaron = new Person({_id: 5, name: 'Mark', age: 33});
    const story1 = new Story({
        title: 'Mark upon a timex.',
        _creator: aaron._id
    });

    aaron.stories.push(story1); // 需加上此句
    aaron.save().then(() => {
        story1.save().catch(err => console.log(err));
    }).catch(err => console.log(err));

查询语句

    Person
    .findOne({ name: 'Mark' })
    .populate('stories') // only works if we pushed refs to children
    .then(person => console.log(person))
    .catch(err => console.log(err));

#### > 更新refs