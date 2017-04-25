/**
 * Created by xxx on 2017/4/25.
 */
import {connect} from 'react-redux';

import HotVideoPage from '../components/HotVideoPage';
import {getHotVideo} from '../api/ApiService';

const mapStateToProps = (state) => {
    return {
        apiBean:state.hotVideo
    };
};

const mapDispatchToProps = (dispatch) => ({
    getHotVideoList: () => {
        dispatch(getHotVideo());
    }
});

const HotVideoContainer = connect(mapStateToProps,mapDispatchToProps)(HotVideoPage);

export default HotVideoContainer;