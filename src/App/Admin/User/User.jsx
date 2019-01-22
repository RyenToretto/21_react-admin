import React, { PureComponent } from 'react';

import {message, Button, Card, Table} from "antd";

import "./css/User.css";

export default class User extends PureComponent {
    constructor(props){
        super(props);
        this.state = {
            isLoading: false,
            columns: [],
            dataSource: []
        }
    }
    
    componentWillMount(){
        this.setState({
            columns: [
                {
                    title: "用户名",
                    className: "user_name",
                    dataIndex: ""
                }, {
                    title: "邮箱",
                    className: "user_email",
                    dataIndex: ""
                }, {
                    title: "电话",
                    className: "user_phone",
                    dataIndex: ""
                }, {
                    title: "注册时间",
                    className: "user_reg_time",
                    dataIndex: ""
                }, {
                    title: "所属角色",
                    className: "user_role",
                    dataIndex: ""
                }, {
                    title: "操作",
                    className: "user_manage",
                    dataIndex: ""
                }
            ]
        })
    }
    
    render(){
        const {isLoading, columns, dataSource} = this.state;
        
        const UserCardTitle = (
            <h3 className="user_box_title">
                <Button type="primary">创建用户</Button>
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
                    dataSource={dataSource}
                />
            </Card>
        )
    }
}
