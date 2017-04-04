/**
 * Created by xxx on 2017/4/1.
 */
import React, {Component, PropTypes} from 'react';

class LinkComp extends Component{
    static propTypes = {
        active: PropTypes.bool.isRequired,
        children: PropTypes.node.isRequired,
        onClick: PropTypes.func.isRequired
    };

    render(){
        const {active, children, onClick} = this.props;
        if(active) return <span>{children}</span>;

        return (
            <a href="#"
               onClick={e => {
                e.preventDefault();
                onClick();
            }}>{children}</a>
        );
    }
}

export default LinkComp;