import React, { PureComponent } from 'react';

import {message, Button, Card, Table} from "antd";
import {requestRoleList} from "../../../api/requestAPI";

import "./css/Role.css";

export default class Role extends PureComponent {
    constructor(props){
        super(props);
        this.state = {
            isLoading: false,
            columns: [],
            dataSource: [],
            curRole: {}
        }
    }
    
    tableInit = ()=>{
        this.setState({
            columns: [
                {
                    title: "角色名称",
                    className: "user_name",
                    dataIndex: "name"
                }, {
                    title: "创建时间",
                    className: "user_email",
                    dataIndex: "create_time"
                }, {
                    title: "授权时间",
                    className: "user_phone",
                    dataIndex: "auth_time"
                }, {
                    title: "授权人",
                    className: "user_reg_time",
                    dataIndex: "auth_name"
                }
            ]
        })
    };
    
    getRoleList = async ()=>{
        const result = await requestRoleList();
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
            onClick: (e)=>{
                this.setState({
                    curRole: role._id
                })
            }
        }
    };
    
    componentWillMount(){
        this.tableInit();    // 初始化表格字段
    }
    
    componentDidMount(){
        this.getRoleList();    // 获取角色列表并显示
    }
    
    render(){
        const {isLoading, columns, dataSource, curRole} = this.state;
        
        const RoleCardTitle = (
            <h3 className="role_box_title">
                <Button type="primary">创建角色</Button>
                <Button type="primary">设置角色权限</Button>
            </h3>
        );
        
        const rowSelection = {
            type: "radio",
            selectedRowKeys: [curRole],
            onChange: (selectedRowKeys, selectedRows) => {    // rowKey 被设置成了 _id
                this.setState({
                    curRole: selectedRowKeys[0]
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
                />
            </Card>
        )
    }
}
