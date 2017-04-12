/**
 * Created by xxx on 2017/4/11.
 */
import * as types from '../constants/ActionTypes';

export const selectTitle = (title) => ({
    type: types.SELECT_TITLE,
    title
});

const requestContents = (title) => ({
    type: types.REQUEST_CONTENTS,
    title
});

const receiveContents = (title,json) => ({
    type: types.RECEIVE_CONTENTS,
    title,
    contents: json.data.children.map(child => child.data),
    receiveAt: Date.now()
});

export const updateContents = (title) => ({
    type: types.UPDATE_CONTENTS,
    title
});

const fetchContents = title => dispatch => {
    dispatch(requestContents(title));
    return fetch(`https://www.reddit.com/r/${title}.json`)
        .then(response => response.json())
        .then(json => dispatch(receiveContents(title,json)));
};

const shouldFetchContents = (state,title) => {
    const item = state.selectContents[title];
    if(!item) return true;
    if(item.isFetching) return false;
    return item.didInvalidate;
};

export const fetchContentsIfNeeded = (title) => (dispatch,getState) => {
    if(shouldFetchContents(getState(),title)){
        return dispatch(fetchContents(title));
    }
};