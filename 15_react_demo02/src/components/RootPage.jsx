import React,{Component} from 'react';

export default class RootPage extends Component{

    render(){
        return (
            <div>
                {this.props.children}
            </div>
        )
    }

}