/**
 * Created by xxx on 2017/4/10.
 */
import * as types from '../constants/ActionTypes';

/**
 * 获取某个标签下所有子id
 * @param state     当前应用的数据
 * @param nodeId    获取某个标签的id
 */
const getAllDescendantIds = (state,nodeId) => (
    state[nodeId].childIds.reduce((acc,childId) => (
        [...acc, childId, ...getAllDescendantIds(state,childId)]
    ), [])
);

export default (state={},action) => {
    const { nodeId } = action;
    if(typeof nodeId === 'undefined'){
        return state;
    }

    let node;
    let childIds;
    switch (action.type){
        case types.INCREMENT:
            node = state[nodeId];
            return {
                ...state,
                [nodeId]: {
                    ...node,
                    counter: ++node.counter
                }
            };
        case types.ADD_CHILD:
            node = state[nodeId];
            childIds = [...node.childIds,action.childId];
            return {
                ...state,
                [nodeId]: {
                    ...node,
                    childIds: childIds
                }
            };
        case types.REMOVE_CHILD:
            node = state[nodeId];
            childIds = node.childIds.filter(id => id !== action.childId);
            return {
                ...state,
                [nodeId]: {
                    ...node,
                    childIds: childIds
                }
            };
        case types.CREATE_NODE:
            node = state[nodeId];
            return {
                ...state,
                [nodeId]: {
                    id: nodeId,
                    counter: 0,
                    childIds: []
                }
            };
        case types.DELETE_NODE:
            const descendantIds = getAllDescendantIds(state,nodeId);
            const ids = [nodeId,...descendantIds];
            state = {...state};
            ids.forEach(id => delete state[id]);
            return state;
        default:
            return state;
    }
}
