/**
 * Created by xxx on 2017/4/25.
 */
import {connect} from 'react-redux';

import HotVideoPage from '../components/HotVideoPage';
import {getHotVideo,updateHotVideo} from '../api/ApiService';

const mapStateToProps = (state) => {
    return {
        apiBean:state.hotVideo
    };
};

const mapDispatchToProps = (dispatch) => ({
    getHotVideoList: () => {
        dispatch(getHotVideo());
    },
    forceUpdateHotVideo: () => {
        dispatch(updateHotVideo())
    }
});

const HotVideoContainer = connect(mapStateToProps,mapDispatchToProps)(HotVideoPage);

export default HotVideoContainer;