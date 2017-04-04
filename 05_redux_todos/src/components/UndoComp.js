/**
 * Created by admin on 2017/4/4.
 */
import React, {Component} from 'react';

class UndoComp extends Component{

    render(){

        let {canUndo,canRedo,onUndo,onRedo} = this.props;

        return(
            <p>
                <button onClick={onUndo} disabled={!canUndo}>上一步</button>
                <button onClick={onRedo} disabled={!canRedo}>下一步</button>
            </p>
        );
    }

}

export default UndoComp;