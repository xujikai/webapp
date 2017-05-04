/**
 * Created by xxx on 2017/4/26.
 */
import {connect} from 'react-redux';
import {getSearchString} from '../api/ApiUtils';

import HotVideoDetailPage from '../components/HotVideoDetailPage';
import {getHotComment} from '../api/ApiService';

const mapStateToProps = (state,ownProps) => {
    const search = ownProps.location.search;
    const pos = getSearchString(search,'pos');
    return {
        pos,
        item: state.hotVideo.data[pos],
        apiBean: state.hotComment
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getHotCommentList() { dispatch(getHotComment()); }
    }
};

const HotVideoDetailContainer = connect(mapStateToProps,mapDispatchToProps)(HotVideoDetailPage);

export default HotVideoDetailContainer;