/**
 * Created by xxx on 2017/4/25.
 */

import * as types from '../constants/ActionTypes';

export const getHotVideo = (status,json,error) => ({
    type: types.REQUEST_HOT_VIDEO,
    status,
    json,
    error
});