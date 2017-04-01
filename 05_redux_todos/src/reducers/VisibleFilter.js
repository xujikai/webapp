/**
 * Created by xxx on 2017/4/1.
 */
const visibleFilter = (state = 'SHOW_ALL',action) => {
    switch (action.type){
        case 'SET_VISIBLE_FILTER':
            return action.filter;
        default:
            return state;
    }
};

export default visibleFilter;