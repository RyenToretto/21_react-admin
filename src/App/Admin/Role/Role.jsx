import React, { PureComponent } from 'react';

import {message, Button, Card, Table, Modal, Form, Input, TreeSelect} from "antd";
import {requestRoleList, requestRoleAdd, requestRoleUpdate} from "../../../api/requestAPI";
import authTreeConfig from "./config/authTreeConfig"
import myLocalStorage from "../../../tools/storeLocalStorage";
import {formateTime} from "../../../tools/MyTools";

import "./css/Role.css";

export default class Role extends PureComponent {
    constructor(props){
        super(props);
        this.state = {
            isLoading: false,
            columns: [],
            dataSource: [],
            curRole: {},
            isRoleAdd: false,
            isRoleConfig: false,
            hadAuthPath: [],
            newConfig:[]
        }
    }
    
    tableInit = ()=>{
        this.setState({
            columns: [
                {
                    title: "角色名称",
                    dataIndex: "name"
                }, {
                    title: "创建时间",
                    dataIndex: "create_time",
                    render: auth_time=>auth_time && formateTime(auth_time)
                }, {
                    title: "授权时间",
                    dataIndex: "auth_time",
                    render: auth_time=>auth_time && formateTime(auth_time)
                }, {
                    title: "授权人",
                    dataIndex: "auth_name"
                }
            ]
        })
    };
    
    getRoleList = async ()=>{
        this.setState({isLoading: true});
        const result = await requestRoleList();
        this.setState({isLoading: false});
        if(result.status === 0){
            const dataSource = result.data.map(each=>({
                _id: each._id,
                name: each.name,
                create_time: each.create_time,
                auth_time: each.auth_time,
                auth_name: each.auth_name,
                menus: each.menus
            }));
            this.setState({
                dataSource
            })
        }else{
            message.error("获取角色列表失败")
        }
    };
    
    clickRow = (role, index)=>{
        return {
            onClick: ()=>{
                this.setState({
                    curRole: role
                })
            }
        }
    };
    
    handleAddRole = async ()=>{
        this.setState({
            isRoleAdd: false
        });
        
        const {newRoleName} = this.addRoleForm.getFieldsValue();
        
        const result = await requestRoleAdd(newRoleName);
        if(result.status === 0){
            const dataSource = [...this.state.dataSource, result.data];
            this.setState({
                dataSource
            });
            message.success("成功创建了一个新角色："+newRoleName);
        }else{
            message.error("创建新角色失败，请稍后再试")
        }
    };
    
    updateMenus = (newConfig)=>{
        this.newConfig = newConfig;
    };
    
    handleUpdateRole = async ()=>{
        this.setState({isRoleConfig: false});
    
        let {curRole} = this.state;
        curRole.auth_name = myLocalStorage.local("user_key").username || 'admin';
        curRole.auth_time = Date.now();
        curRole.menus = [];
        this.newConfig.forEach(each=>{
            if(each==="/products"){
                curRole.menus.push("/category");
                curRole.menus.push("/product");
            }else if(each==="/category" || each==="/product"){
                curRole.menus.push("/products");
            }else if(each==="/charts"){
                curRole.menus.push("/charts/bar");
                curRole.menus.push("/charts/line");
                curRole.menus.push("/charts/pie");
            }else if(each==="/charts/bar" || each==="/charts/line" || each==="/charts/pie"){
                curRole.menus.push("/charts");
            }
            curRole.menus.push(each);
        });
        
        const result = await requestRoleUpdate(curRole);
        if(result.status === 0){
            message.success("角色权限设置已更新");
            const curUser = myLocalStorage.local("user_key");
            if(curRole._id === curUser.role_id){
                myLocalStorage.remove("user_key");
                this.props.history.replace("/login");
            }
        }else{
            message.error("角色权限设置失败，请稍后重试");
        }
    };
    
    componentWillMount(){
        this.tableInit();    // 初始化表格字段
    }
    
    componentDidMount(){
        this.getRoleList();    // 获取角色列表并显示
    }
    
    render(){
        const {isLoading, columns, dataSource, curRole, isRoleAdd, isRoleConfig, hadAuthPath} = this.state;
        const RoleCardTitle = (
            <h3 className="role_box_title">
                <Button type="primary" onClick={()=>{this.setState({isRoleAdd: true})}}>创建角色</Button>
                <Button
                    type="primary"
                    disabled={!(!!curRole._id)}
                    onClick={()=>{
                    this.newConfig = [];
                    if(curRole.menus){
                        curRole.menus.forEach(each=>{
                            if(each==="/products" || each==="/charts"){
            
                            }else{
                                this.newConfig.push(each);
                            }
                        });
                    }
                    this.setState({isRoleConfig: true, hadAuthPath: this.newConfig});
                }}>
                    设置角色权限
                </Button>
            </h3>
        );
        
        const rowSelection = {
            type: "radio",
            selectedRowKeys: [curRole._id],
            onChange: (selectedRowKeys, selectedRows) => {    // rowKey 被设置成了 _id
                this.setState({
                    curRole: selectedRows[0]
                });
            }
        };
        
        return (
            <Card
                className="role_card"
                title={RoleCardTitle}
                bordered={false}
            >
                <Table
                    className="role_table"
                    bordered={true}
                    
                    loading={isLoading}
                    rowKey="_id"
                    columns={columns}
                    dataSource={dataSource}
                    
                    rowSelection={rowSelection}
                    onRow={this.clickRow}
                    pagination={{
                        showSizeChanger: true,
                        defaultPageSize: 10,
                        pageSizeOptions: ["2", "3", "4", "5", "6", "7", "8", "9", "10"],
                        showQuickJumper: true
                    }}
                />
                
                <Modal
                    className="role_modal"
                    destroyOnClose={true}
                    title="添加角色"
                    visible={isRoleAdd}
                    onCancel={()=>this.setState({isRoleAdd: false})}
                    onOk={this.handleAddRole}
                >
                    <AddRoleForm setForm={(form)=>this.addRoleForm=form}/>
                </Modal>
                
                <Modal
                    className="role_modal"
                    destroyOnClose={true}
                    title="设置角色权限"
                    visible={isRoleConfig}
                    onCancel={()=>this.setState({isRoleConfig: false})}
                    onOk={this.handleUpdateRole}
                >
                    <ConfigRoleForm
                        roleName={curRole.name}
                        hadAuthPath={hadAuthPath}
                        updateMenus = {this.updateMenus}
                    />
                </Modal>
            </Card>
        )
    }
}

class AddRole extends PureComponent {
    componentWillMount(){
        this.props.setForm(this.props.form);
    }
    
    render(){
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol:  {span: 4},
            wrapperCol: {span: 16}
        };
        
        return(
            <Form>
                <Form.Item label="角色名称 ：" {...formItemLayout}>
                    {
                    getFieldDecorator("newRoleName", {
                        initialValue: ""
                    })(
                        <Input type="text" placeholder="请输入新角色的名称"/>
                    )
                }
                </Form.Item>
            </Form>
        )
    }
}

class ConfigRole extends PureComponent {
    state = {
        newConfig:[],
        oldConfig: []
    };
    
    onChange = (value, label, extra)=>{
        this.setState({newConfig: value});
        this.props.updateMenus(value);
    };
    
    componentWillMount(){
        const {hadAuthPath} = this.props;
        this.setState({
            newConfig: hadAuthPath
        })
    }
    
    render(){
        const {newConfig} = this.state;
        const {roleName} = this.props;
        const formItemLayout = {
            labelCol:  {span: 4},
            wrapperCol: {span: 16}
        };
        
        const SHOW_PARENT = TreeSelect.SHOW_PARENT;
        
        return(
            <Form>
                <Form.Item label="角色名称 ：" {...formItemLayout}>
                    <Input type="text" value={roleName} />
                </Form.Item>
                
                <Form.Item label="设置权限 ：" {...formItemLayout}>
                    <TreeSelect
                        className="auth_tree"
                        treeData = {authTreeConfig}
                        value = {newConfig}
                        onChange = {this.onChange}
                        treeCheckable = {true}
                        treeDefaultExpandAll = {true}
                        showCheckedStrategy = {SHOW_PARENT}
                    />
                </Form.Item>
            </Form>
        )
    }
}

const AddRoleForm = Form.create()(AddRole);
const ConfigRoleForm = Form.create()(ConfigRole);
