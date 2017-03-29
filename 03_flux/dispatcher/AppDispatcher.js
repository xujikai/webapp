const Dispatcher = require('flux').Dispatcher;
const AppDispatcher = new Dispatcher();
const ListStore = require('../stores/ListStore');

AppDispatcher.register(function (action) {
    switch (action.actionType){
        case 'ADD_NEW_ITEM':
            ListStore.addNewItemHandler(action.text);
            ListStore.emitChange();
            break;
        case 'DEL_ITEM':
            ListStore.delItemHandler();
            ListStore.emitChange();
            break;
    }
});

module.exports = AppDispatcher;