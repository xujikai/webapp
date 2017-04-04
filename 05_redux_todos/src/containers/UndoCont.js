/**
 * Created by admin on 2017/4/4.
 */
import { ActionCreators as UndoActionCreators } from 'redux-undo';
import {connect} from 'react-redux';
import UndoComp from '../components/UndoComp';

const mapStateToProps = (state) => {
    return {
        canUndo:state.todos.past.length > 0,
        canRedo:state.todos.future.length > 0
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onUndo: () => {
            dispatch(UndoActionCreators.undo());
        },
        onRedo: () => {
            dispatch(UndoActionCreators.redo());
        }
    }
};

const UndoCont = connect(mapStateToProps,mapDispatchToProps)(UndoComp);

export default UndoCont;