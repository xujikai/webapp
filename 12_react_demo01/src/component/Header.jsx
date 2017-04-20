import React,{Component,PropTypes} from 'react';
import {Link} from 'react-router';
import '../style/header.scss';

export default class Header extends Component{

    render(){
        const {title} = this.props;

        return (
            <div className="header_container">
                <div className="header_left"/>
                <div className="header_title">{title}</div>
                <Link to='/order'>
                    <div className="header_right"/>
                </Link>
            </div>
        );
    }

}

Header.propTypes = {
    title: PropTypes.string.isRequired,
    handleHeaderRight: PropTypes.func
};