/**
 * Created by admin on 2017/4/4.
 */
import {connect} from 'react-redux';
import AddComp from '../components/AddComp';
import {addTodo} from '../actions/TodoAct'

const mapStateToProps = (state, ownProps) => {
    return {

    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onSubmit(value){
            dispatch(addTodo(value));
        }
    }
};

const AddCont = connect(mapStateToProps,mapDispatchToProps)(AddComp);

export default AddCont;