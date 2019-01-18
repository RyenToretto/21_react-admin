import React, { Component } from 'react';

import {Card, Button, Icon, Table, message, Modal, Form, Input, Select} from "antd";

import "./css/ProductShow.css";

export default class ProductShow extends Component {
    constructor(props){
        super(props);
        this.state={
            columns: [{
                title: '商品名称',
                className: 'product_name',
                dataIndex: 'product_name',
            }, {
                title: '商品描述',
                className: 'product_describe',
                dataIndex: 'product_describe',
            }, {
                title: '价格',
                className: 'product_price',
                dataIndex: 'product_price',
            }, {
                title: '状态',
                className: 'product_info',
                dataIndex: 'product_info',
                render: product => (
                    <div>
                        <Button>下架</Button>
                        <span>在售</span>
                    </div>
                )
            }, {
                title: '操作',
                className: 'product_info',
                dataIndex: 'product_info',
                render: goods_info => (
                    <div>
                        <Button>详情</Button>
                        <Button>修改</Button>
                    </div>
                )
            }],
            dataSource: []
        }
    }
    
    render(){
        const cardTitle = (
            <div className="card_title">
                <div className="card_title_left">
                    <Select className="good_search_way" defaultValue={1}>
                        <Select.Option key={1} value={1}>根据商品名称</Select.Option>
                        <Select.Option key={2} value={2}>根据商品描述</Select.Option>
                        <Select.Option key={3} value={3}>3</Select.Option>
                    </Select>
                    <Input type="text" className="good_search_keyword" placeholder="请输入关键字"/>
                    <Button className="good_search_btn">搜索</Button>
                </div>
                <Button className="card_title_right_btn">
                    <Icon type="plus"/>
                    添加产品
                </Button>
            </div>
        );
        
        return (
            <Card
                className="good_card"
                bordered={false}
                title={cardTitle}
            >
                {/*<Table*/}
                    {/*columns={}*/}
                    {/*dataSource={}*/}
                    {/*className={}*/}
                    {/*bordered={}*/}
                {/*/>*/}
            </Card>
        )
    }
}
