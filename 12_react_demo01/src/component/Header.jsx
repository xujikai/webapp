import React,{Component,PropTypes} from 'react';
import '../style/header.scss';

export default class Header extends Component{

    render(){
        const {title,handleHeaderRight} = this.props;

        return (
            <div className="header_container">
                <div className="header_left"/>
                <div className="header_title">{title}</div>
                <div className="header_right" onClick={handleHeaderRight}/>
            </div>
        );
    }

}

Header.propTypes = {
    title: PropTypes.string.isRequired,
    handleHeaderRight: PropTypes.func
};