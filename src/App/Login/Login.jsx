import React, { Component } from 'react';

import {Form, Input, Icon, Button} from "antd";

import "./css/Login.css";
import logoPng from "./img/logo.png";

export default class Login extends Component {
    render(){
        return (
            <div className="login_box">
                <h2>
                    <img src={logoPng} alt="登录 Logo"/>
                    后台管理系统
                </h2>
                <WrappedLoginForm/>
            </div>
        )
    }
}

class OriginLogin_form extends Component {
    checkLogin = ()=>{
        // 通过 包装器 获取表单项的值
        const userName = this.props.form.getFieldValue("user_name");
        const userPWD = this.props.form.getFieldValue("user_password");
        
        this.props.form.validateFields((error, values)=>{
            if(error){
                values.resetFields();    // 不传参，默认重置所有表单项
            }else{
                console.log(userName+" ---- "+userPWD+" ---- 输入合法，可以进行 ajax 请求了")
            }
        });
    };
    
    // rule 是字段的描述
    checkPassword = (rule, value, callback)=>{
        console.log(rule);
        if(!value){
            callback("必须输入密码");
        }else if(value.length<4 || value.length>8){
            callback("密码必须 4-8 位");
        }else{
            callback();    // 不传参数代表成功
        }
    };
    
    render(){
        const {getFieldDecorator} = this.props.form;
        return (
            <Form>
                <Form.Item>
                    {
                        getFieldDecorator("user_name", {
                            initialValue: "admin",
                            rules: [    // 声明式验证 用户名 表单
                                {required: true, message: "必须输入用户名"},
                                {min: 4, message: "用户名必须 4 个字符以上"}
                            ]
                        })(
                            <Input
                                prefix={<Icon type="user" />}
                                placeholder="请输入用户名"
                            />
                        )
                    }
                </Form.Item>
        
                <Form.Item>
                    {
                        getFieldDecorator("user_password", {
                            rules: [    // 灵活性更强 - 编程式验证 密码 表单
                                {validator: this.checkPassword}
                            ]
                        })(
                            <Input
                                prefix={<Icon type="lock" />}
                                placeholder="请输入密码"
                            />
                        )
                    }
                </Form.Item>
        
                <Form.Item>
                    <Button type="primary" onClick={this.checkLogin}>登录</Button>
                </Form.Item>
            </Form>
        )
    }
}

const WrappedLoginForm = Form.create()(OriginLogin_form);
