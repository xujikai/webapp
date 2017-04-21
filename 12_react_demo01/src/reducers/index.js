/**
 * Created by xxx on 2017/4/20.
 */
import * as types from '../constants/ActionTypes';
import {combineReducers} from 'redux';

const initPosts = {
    data: {},
    isFetching: false
};

const hotVideos = (state = initPosts,action) => {
  switch (action.type){
      case types.REQUEST_POSTS:
          return {
              ...state,
              isFetching: true
          };
      case types.RECEIVE_POSTS:
          return {
              ...state,
              data: action.json,
              isFetching: false
          };
      default:
          return state;
  }
};

// const orders = (state,action) => {
//   switch (action.type){
//       case types.REQUEST_POSTS:
//           return state;
//       default:
//           return state;
//   }
// };

const reducer = combineReducers({
    hotVideos
});

export default reducer;
