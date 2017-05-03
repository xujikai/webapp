import React,{Component} from 'react';

import {Form,FormGroup,FormControl,Col,ControlLabel,Button} from 'react-bootstrap/lib';

export default class HotVideoAddPage extends Component{

    render(){
        return(
            <div>
                <h1>视频添加</h1>
                <Form horizontal action="http://192.168.0.92:3000/api/hotVideo/add" method="post">
                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={2}>
                            视频标签
                        </Col>
                        <Col sm={9}>
                            <FormControl type="text" placeholder="大于2个字符" name="label"/>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={2}>
                            视频链接
                        </Col>
                        <Col sm={9}>
                            <FormControl type="text" name="videoUrl"/>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={2}>
                            视频时长
                        </Col>
                        <Col sm={9}>
                            <FormControl type="text" name="videoLength"/>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col smOffset={2} sm={9}>
                            <Button type="submit">添加</Button>
                        </Col>
                    </FormGroup>
                </Form>
            </div>
        );
    }

}