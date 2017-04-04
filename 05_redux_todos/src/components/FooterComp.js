/**
 * Created by xxx on 2017/4/1.
 */
import React,{Component} from 'react';
import LinkCont from '../containers/LinkCont';

class FooterComp extends Component{
    render(){
        return (
            <p>
                Show:
                {' '}
                <LinkCont filter="SHOW_ALL">All</LinkCont>
                {', '}
                <LinkCont filter="SHOW_ACTIVE">Active</LinkCont>
                {', '}
                <LinkCont filter="SHOW_COMPLETED">Completed</LinkCont>
            </p>
        );
    }
}

export default FooterComp;