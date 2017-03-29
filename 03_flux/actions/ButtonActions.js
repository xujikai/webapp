const AppDispatcher = require('../dispatcher/AppDispatcher');

const ButtonActions = {

    addNewItem(text){
        AppDispatcher.dispatch({
            actionType: 'ADD_NEW_ITEM',
            text: text,
        });
    },

    delItem(){
        AppDispatcher.dispatch({
            actionType: 'DEL_ITEM',
            text: '',
        });
    }
};

module.exports = ButtonActions;