import React, { Component } from 'react';

import {requestGetProducts} from "../../../../api/requestAPI"
import {Card, Button, Icon, Table, message, Modal, Form, Input, Select} from "antd";

import "./css/ProductShow.css";

export default class ProductShow extends Component {
    constructor(props){
        super(props);
        this.state={
            columns: [{
                title: '商品名称',
                className: 'product_name',
                dataIndex: 'name',
            }, {
                title: '商品描述',
                className: 'product_desc',
                dataIndex: 'desc',
            }, {
                title: '价格',
                className: 'product_price',
                dataIndex: 'price',
            }, {
                title: '状态',
                className: 'product_status',
                dataIndex: 'status',
                render: status => (
                    <div>
                        <Button>下架</Button>
                        <span>在售</span>
                    </div>
                )
            }, {
                title: '操作',
                className: 'product_manage',
                render: product => (
                    <div>
                        <Button>详情</Button>
                        <Button>修改</Button>
                    </div>
                )
            }],
            dataSource: [],
            pageInfo: {},
            curPageSize: 3,
            isLoading: false
        }
    }
    
    showProducts = async (pageNum, pageSize)=>{
        this.setState({isLoading: true});
        const result = await requestGetProducts(pageNum, pageSize);
        this.setState({isLoading: false});
        if(result.status === 0){
            const {pageNum, pageSize, pages, total} = result.data;
            let dataSource = [];
            result.data.list.forEach((each, index)=>{
                dataSource.push({
                    key: each._id,
                    name: each.name,
                    desc: each.desc,
                    price: each.price,
                    status:each.status,
                    categoryId: each.categoryId,
                    pCategoryId: each.pCategoryId,
                    detail: each.detail,
                    imgs: each.imgs,
                })
            });
            
            const {key} = result.data.list;
            this.setState({
                dataSource,
                pageInfo: {pageNum, pageSize, pages, total}
            })
        }else{
            console.log(result);
            message.error("请求商品列表失败")
        }
    };
    
    componentDidMount(){
        this.showProducts(1, this.state.curPageSize)
    }
    render(){
        const {columns, dataSource, isLoading, pageInfo} = this.state;
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
                className="product_show"
                bordered={false}
                title={cardTitle}
            >
                <Table
                    className="product_table"
                    loading={isLoading}
                    columns={columns}
                    dataSource={dataSource}
                    bordered={true}
                    pagination={{
                        showSizeChanger: true,
                        defaultPageSize: pageInfo.pageSize?pageInfo.pageSize:this.state.curPageSize,
                        pageSizeOptions: ["2", "3", "4", "5", "6", "7", "8", "9", "10"],
                        showQuickJumper: true,
                        total: pageInfo.total,
                        showTotal: (total=>"共 "+total+" 条数据"),
                        onChange: (page, pageSize)=>this.showProducts(page, pageSize),
                        onShowSizeChange: (page, pageSize)=>this.showProducts(page, pageSize)
                    }}
                />
            </Card>
        )
    }
}
