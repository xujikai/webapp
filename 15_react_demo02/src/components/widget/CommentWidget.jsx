import React,{Component} from 'react';

import {FormControl,Button} from 'react-bootstrap/lib'

export default class CommentWidget extends Component{

    render(){
        return (
            <div>
                <FormControl type="text" placeholder="Enter text"/>
                <Button>提交</Button>
            </div>
        );
    }

}