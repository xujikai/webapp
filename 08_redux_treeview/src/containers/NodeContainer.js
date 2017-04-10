/**
 * Created by xxx on 2017/4/10.
 */
import { connect } from 'react-redux';
import * as actions from '../actions';
import Node from '../components/Node';

const mapStateToProps = (state,ownProps) => ({
    node: state[ownProps.id]
});

const mapDispatchToProps = (dispatch) => ({
    increment: (nodeId) => {
        dispatch(actions.increment(nodeId));
    },
    addChild: (nodeId,childId) => {
        dispatch(actions.addChild(nodeId,childId));
    },
    removeChild: (nodeId,childId) => {
        dispatch(actions.removeChild(nodeId,childId));
    },
    createNode: () => {
        const action = actions.createNode();
        dispatch(action);
        return action;
    },
    deleteNode: (nodeId) => {
        dispatch(actions.deleteNode(nodeId));
    }
});

const NodeContainer = connect(mapStateToProps,mapDispatchToProps)(Node);

export default NodeContainer;