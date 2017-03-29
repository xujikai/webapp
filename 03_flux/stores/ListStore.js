const EventEmitter = require('events').EventEmitter;
const assign = require('object-assign');

const ListStore = assign({},EventEmitter.prototype,{
    items:[],

    getAll(){
      return this.items;
    },

    addNewItemHandler(text){
        this.items.push(text);
    },

    delItemHandler(){
        this.items.shift();
    },

    emitChange(){
        this.emit('change');
    },

    addChangeListener(callback){
        this.on('change',callback);
    },

    removeChangeListener(callback){
        this.removeListener('change',callback);
    }
});

module.exports = ListStore;