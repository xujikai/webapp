/**
 * Created by xxx on 2017/4/11.
 */
import {combineReducers} from 'redux';
import * as types from '../constants/ActionTypes';

const initTitleState = 'reactjs';

const initContentsByTitle = {
    isFetching: false,
    didInvalidate: false,
    items: []
};

const getContentsByTitle = (state = initContentsByTitle,action) => {
    switch (action.type){
        case types.REQUEST_CONTENTS:
            return {
                ...state,
                isFetching: true,
                didInvalidate: false
            };
        case types.RECEIVE_CONTENTS:
            return {
                ...state,
                isFetching: false,
                didInvalidate: false,
                items: action.contents,
                lastUpdated: action.receiveAt
            };
        case types.UPDATE_CONTENTS:
            return {
                ...state,
                didInvalidate: true
            };
        default:
            return state;
    }
};

const selectContents = (state = {},action) => {
    switch (action.type){
        case types.REQUEST_CONTENTS:
        case types.RECEIVE_CONTENTS:
        case types.UPDATE_CONTENTS:
            return {
                ...state,
                [action.title]: getContentsByTitle(state[action.title],action)
            };
        default:
            return state;
    }
};

const selectTitle = (state = initTitleState,action) => {
    switch (action.type){
        case types.SELECT_TITLE:
            return action.title;
        default:
            return state;
    }
};

const reducer = combineReducers({
    selectContents,
    selectTitle
});

export default reducer;