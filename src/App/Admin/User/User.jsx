import React, { PureComponent } from 'react';

import {message, Button, Card, Table, Modal, Form, Input, Select} from "antd";
import {requestAllUser, requestDeleteUser, requestAddUser, requestUpdateUser} from '../../../api/requestAPI';
import {formateTime} from '../../../tools/MyTools';

import "./css/User.css";

export default class User extends PureComponent {
    constructor(props){
        super(props);
        this.state = {
            isLoading: false,
            columns: [],
            allUser: [],
            allRole: [],
            roleName: {},
            isAddUser: false,
            isUpdateUser: false,
            curUser: []
        }
    }
    
    userTableInit = ()=>{
        this.setState({
            columns: [
                {
                    title: "用户名",
                    className: "user_name",
                    dataIndex: "username"
                }, {
                    title: "邮箱",
                    className: "user_email",
                    dataIndex: "email"
                }, {
                    title: "电话",
                    className: "user_phone",
                    dataIndex: "phone"
                }, {
                    title: "注册时间",
                    className: "user_reg_time",
                    dataIndex: "create_time",
                    render:formateTime
                }, {
                    title: "所属角色",
                    className: "user_role",
                    dataIndex: "role_id",
                    render: (role_id)=>{
                        const {roleName} = this.state;
                        return roleName[role_id];
                    }
                }, {
                    title: "操作",
                    className: "user_manage",
                    render: (theUser)=>{
                        return (<div>
                            <Button type="primary" onClick={()=>this.setState({isUpdateUser: true, curUser: theUser})}>修改</Button>
                            <Button type="primary" onClick={()=>this.handleDeleteUser(theUser)}>删除</Button>
                        </div>)
                    }
                }
            ]
        })
    };
    
    handleUpdateUser = (theUser)=>{
        console.log(theUser)
    };
    
    addOrUpdateUser = async ()=>{
        const {isAddUser, isUpdateUser} = this.state;
        
        let result = {};
        let allUser = [...this.state.allUser];
        const newUser = this.userForm.getFieldsValue();
        
        let successTips = "创建新用户成功 ：";
        let errorTips = "创建新用户失败，请稍后重试";
        let username = "";
        if(isAddUser){
            result = await requestAddUser(newUser);
            username  = result.user && result.user.username;
            allUser.push(result.user);
        }else if(isUpdateUser){
            newUser._id=  this.userForm.userId;
            result = await requestUpdateUser(newUser);
            successTips = "修改用户信息成功 ：";
            errorTips = "修改用户信息失败，请稍后重试";
            username  = result.data && result.data.username;
            allUser = allUser.filter(each=>(each._id!==result.data._id));
            allUser.push(result.data);
        }
        if(result.status === 0){
            message.success(successTips+username);
            this.setState({
                allUser
            })
        }else{
            message.error(errorTips)
        }
        this.setState({isAddUser: false, isUpdateUser: false});
        this.userForm.resetFields();
    };
    
    handleDeleteUser = async (theUser)=>{
        const result = await requestDeleteUser(theUser._id);
        if(result.status === 0){
            message.success("删除用户 "+ theUser.username +" 成功");
            let {allUser} = this.state;
            allUser = allUser.filter(each=>each._id!==theUser._id);
            this.setState({
                allUser
            });
        }else{
            message.error("删除用户 "+ theUser.username +" 失败，请稍后重试")
        }
    };
    
    getAllUser = async ()=>{
        this.setState({isLoading: true});
        const result = await requestAllUser();
        this.setState({isLoading: false});
        if(result.status === 0){
            const roleName = result.data.roles.reduce((pre, next)=>{
                pre[next._id] = next.name;
                return pre;
            }, {});
            this.setState({
                allUser: result.data.users,
                allRole: result.data.roles,
                roleName
            })
        }else{
            message.error("获取所有用户的列表失败，请稍后再试")
        }
    };
    
    componentWillMount(){
        this.userTableInit();
    }
    
    componentDidMount(){
        this.getAllUser();
    }
    
    render(){
        const {isLoading, columns, allUser, allRole, isAddUser, isUpdateUser, curUser} = this.state;
        
        const UserCardTitle = (
            <h3 className="user_box_title">
                <Button type="primary" onClick={()=>{
                    this.setState({isAddUser: true});
                }}>创建用户</Button>
            </h3>
        );
        
        return (
            <Card
                className="user_card"
                title={UserCardTitle}
                bordered={false}
            >
                <Table
                    className="user_table"
                    bordered={true}
                    loading={isLoading}
                    rowKey="_id"
                    columns={columns}
                    dataSource={allUser}
                />
                
                <Modal
                    className="user_modal"
                    destroyOnClose={true}
                    title="添加新用户"
                    visible={isAddUser || isUpdateUser}
                    onCancel={()=>{this.setState({isAddUser: false, isUpdateUser: false})}}
                    onOk={this.addOrUpdateUser}
                >
                    <WrappedUserForm
                        isUpdateUser={isUpdateUser}
                        allRole={allRole}
                        curUser={curUser || {}}
                        setForm={form=>{this.userForm=form}}
                    />
                </Modal>
            </Card>
        )
    }
}

class UserForm extends PureComponent {
    componentWillMount(){
        this.props.form.userId = this.props.curUser._id;
        this.props.setForm(this.props.form);
    }
    
    render(){
        const {getFieldDecorator} = this.props.form;
        const {isUpdateUser, allRole, curUser} = this.props;
        return (
            <Form className="user_form">
                <Form.Item className="user_form_item">
                    <label>
                        <span>用户名 :</span>
                        {
                            getFieldDecorator("username", {
                                initialValue: curUser.username
                            })(
                                <Input type="text" placeholder="请输入用户名"/>
                            )
                        }
                    </label>
                </Form.Item>
                {
                    isUpdateUser?null:(
                        <Form.Item className="user_form_item">
                            <label>
                                <span>密码 :</span>
                                {
                                    getFieldDecorator("password", {
                                        initialValue: ""
                                    })(
                                        <Input type="text" placeholder="请输入密码"/>
                                    )
                                }
                            </label>
                        </Form.Item>
                    )
                }
                <Form.Item className="user_form_item">
                    <label>
                        <span>手机号 :</span>
                        {
                            getFieldDecorator("phone", {
                                initialValue: curUser.phone
                            })(
                                <Input type="text" placeholder="请输入手机号"/>
                            )
                        }
                    </label>
                </Form.Item>
        
                <Form.Item className="user_form_item">
                    <label>
                        <span>邮箱 :</span>
                        {
                            getFieldDecorator("email", {
                                initialValue: curUser.email
                            })(
                                <Input type="text" placeholder="请输入邮箱"/>
                            )
                        }
                    </label>
                </Form.Item>
        
                <Form.Item className="user_form_item">
                    <label>
                        <span>角色 :</span>
                        {
                            getFieldDecorator("role_id", {
                                initialValue: curUser.role_id
                            })(
                                <Select>
                                    {
                                        allRole.map(each=> (
                                            <Select.Option
                                                key={each._id}
                                                value={each._id}
                                            >
                                                {each.name}
                                            </Select.Option>)
                                        )
                                    }
                                </Select>
                            )
                        }
                    </label>
                </Form.Item>
            </Form>
        )
    }
}

const WrappedUserForm = Form.create()(UserForm);
