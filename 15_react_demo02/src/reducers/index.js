/**
 * Created by xxx on 2017/4/25.
 */
import {combineReducers} from 'redux';

import hotVideo from './hotVideo';
import hotComment from './hotComment';

const reducer = combineReducers({
    hotVideo,
    hotComment
});

export default reducer;