import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import '../style/login.scss';

export default class LoginPage extends Component {

    render() {
        return (
            <div className="transition-item login_container simple_enter">
                <AppBar
                    title="登录"
                    iconClassNameRight="muidocs-icon-navigation-expand-more"
                />

                <div className="logo"/>

                <TextField
                    hintText="3-6为字母、数字、汉字"
                    floatingLabelText="请输入用户名"
                    style={{
                        width: '80%'
                    }}
                />
                <TextField
                    hintText="6-20位字母、数字、汉字"
                    floatingLabelText="请输入密码"
                    style={{
                        width: '80%'
                    }}
                />

                <RaisedButton
                    label="登录"
                    primary={true}
                    onTouchTap={() => browserHistory.push('/hotVideo')}
                    style={
                        {margin: '1.5rem 0 0.5rem 0', width: '90%'}
                    }
                />

                <RaisedButton
                    label="注册"
                    primary={true}
                    style={
                        {margin: '0.5rem 0', width: '90%'}
                    }
                />
            </div>
        );
    }

}