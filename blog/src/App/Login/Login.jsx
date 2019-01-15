import React, { Component } from 'react';

import {Form, Input, Icon, Button} from "antd";

import "./css/Login.css";
import mePng from "./img/me.jpg";

export default class Login extends Component {
    render(){
        return (
            <div id="login_outer">
                <div id="holder_top">
                    生于忧患
                    <div id="die">死于安乐<hr id="die_line"/></div>
                </div>
                <div id="holder_bottom">
                    我于黎明之中绽放
                    <div id="jin">亦如杀戮中的花朵<hr id="jin_line"/></div>
                </div>
                <div className="login_box">
                    <h2>
                        <a href="https://www.baidu.com" target="_blank"><img src={mePng} alt="登录 Logo"/></a>
                        管理员登录
                    </h2>
                    <WrappedLoginForm/>
                </div>
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
                console.log("错错错错错错");
            }else{
                console.log(userName+" ---- "+userPWD+" ---- 输入合法，可以进行 ajax 请求了")
            }
            //this.props.form.resetFields();    // 不传参，默认重置所有表单项
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
