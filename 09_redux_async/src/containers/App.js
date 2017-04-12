/**
 * Created by xxx on 2017/4/12.
 */
import {connect} from 'react-redux';
import * as actions from '../actions';
import Contents from '../components/Contents';

const mapStateToProps = (state) => {
    const {selectTitle,selectContents} = state;
    const data = selectContents[selectTitle] || {
        isFetching: false,
        didInvalidate: false,
        items: []
    };

    return {
        title: selectTitle,
        data: data,
        options: ['reactjs','frontend']
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getContents: (title) => {
            dispatch(actions.fetchContentsIfNeeded(title));
        },
        updateContents: (title) => {
            dispatch(actions.updateContents(title));
        },
        onChange: (title) => {
            dispatch(actions.selectTitle(title));
        }
    }
};

const App = connect(mapStateToProps,mapDispatchToProps)(Contents);

export default App;