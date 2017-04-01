/**
 * Created by xxx on 2017/4/1.
 */
import {connect} from 'react-redux';
import Link from '../components/Link';
import {setVisibleFilter} from '../actions/TodoAction';

const mapStateToProps = (state, ownProps) => {
    return {
        active: ownProps.filter === state.visibleFilter
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onClick:() => {
            dispatch(setVisibleFilter(ownProps.filter));
        }
    }
};

const FilterLink = connect(mapStateToProps,mapDispatchToProps)(Link);

export default FilterLink;