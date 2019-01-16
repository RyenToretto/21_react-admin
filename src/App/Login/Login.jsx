import React, { Component } from 'react';

import {requestLogin} from "../../api/requestAPI";
import myLocalStorage from "../../tools/storeLocalStorage";
import storeMemory from "../../tools/storeMemory";
import {Form, Input, Icon, Button, message} from "antd";

import "./css/Login.css";
import logoPng from "./img/logo.png";

export default class Login extends Component {
    login = async (userName, userPWD)=>{
        const USER_KEY = 'user_key';
        try{
            const result = await requestLogin(userName, userPWD);
            if(result.status === 0){
                myLocalStorage.local(USER_KEY, result.data);
                storeMemory.memory.user_key = result.data;    // 存入内存便于读
                message.info("登录成功, "+userName+" 欢迎回来！");
                this.props.history.replace("/admin");
            }else{
                message.info(result.msg);
            }
        }catch(e){
            message.info(e);
        }
    };
    
    render(){
        return (
            <div className="login_box">
                <h2>
                    <img src={logoPng} alt="登录 Logo"/>
                    后台管理系统
                </h2>
                <WrappedLoginForm login={this.login}/>
            </div>
        )
    }
}

class OriginLogin_form extends Component {
    checkLogin = ()=>{
        // 通过 包装器 获取表单项的值
        const userName = this.props.form.getFieldValue("user_name");
        const userPWD = this.props.form.getFieldValue("user_password");
        
        this.props.form.validateFields(async (error, values)=>{
            if(error){
            
            }else{
                this.props.login(userName, userPWD);
            }
            this.props.form.resetFields();    // 不传参，默认重置所有表单项
        });
    };
    
    // rule 是字段的描述
    checkPassword = (rule, value, callback)=>{
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
                                type="text"
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
                                type="password"
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
