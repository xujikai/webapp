/**
 * Created by xxx on 2017/4/1.
 */
import {connect} from 'react-redux';
import LinkComp from '../components/LinkComp';
import {setVisibleFilter} from '../actions/TodoAct';

const mapStateToProps = (state, ownProps) => {
    return {
        active: ownProps.filter === state.visibleFilter
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onClick() {
            dispatch(setVisibleFilter(ownProps.filter));
        }
    }
};

const LinkCont = connect(mapStateToProps,mapDispatchToProps)(LinkComp);

export default LinkCont;