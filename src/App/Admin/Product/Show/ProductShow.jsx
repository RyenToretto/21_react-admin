import React, { Component } from 'react';

import {
    requestGetProducts,
    requestSearchProduct,
    requestProductStatus
} from "../../../../api/requestAPI";

import {Card, Button, Icon, Table, message, Modal, Form, Input, Select} from "antd";

import myMemory from "../../../../tools/storeMemory";

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
                render: (status, product)=>(
                    <div>
                        <Button onClick={()=>this.handleProductStatus(product.key, status)}>{status===1?"下架":"上架"}</Button>
                        <span className="status_span">{status===1?"在售":"已下架"}</span>
                    </div>
                )
            }, {
                title: '操作',
                className: 'product_manage',
                render: product=>(
                    <div>
                        <Button onClick={()=>this.toProductOf("detail", product)}>详情</Button>
                        <Button onClick={()=>this.toProductOf("edit", product)}>修改</Button>
                    </div>
                )
            }],
            dataSource: [],
            pageInfo: {},
            curPageSize: myMemory.memory.product.pageSize,
            isLoading: false,
            searchType: "productName",
            searchName: ""
        }
    }
    
    showProducts = async (pageNum, pageSize)=>{
        this.setState({isLoading: true});
        const {searchType, searchName} = this.state;
        let result = false;
        if(searchName){
            result = await requestSearchProduct(pageNum, pageSize, searchType, searchName);
        }else{
            result = await requestGetProducts(pageNum, pageSize);
        }
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
            
            this.setState({
                dataSource,
                pageInfo: {pageNum, pageSize, pages, total}
            })
        }else{
            message.error("请求商品列表失败")
        }
    };
    
    handleOnChange = (page, pageSize)=>{
        this.showProducts(page, pageSize);
        let {pageInfo} = this.state;
        pageInfo.pageNum = page;
        pageInfo.pageSize = pageSize;
        this.setState({pageInfo, curPageSize: pageSize});
    };
    
    handleSearch = (e)=>{
        let {pageInfo, curPageSize} = this.state;
        if(e || !pageInfo.pageNum){    // 如果 e 存在，说明是 搜索 btn，则 1
            pageInfo.pageNum = 1;
        }
        if(myMemory.memory.product.pageNum){    // 是从其他页面回来的，取原来的 页码、页大小
            pageInfo.pageNum = myMemory.memory.product.pageNum;
            curPageSize = myMemory.memory.product.pageSize;
            pageInfo.pageSize = curPageSize;
            
            myMemory.memory.product.pageNum = false;
        }
        this.setState({
            pageInfo,
            curPageSize
        });
        this.showProducts(pageInfo.pageNum, curPageSize)
    };
    
    handleProductStatus = async (productId, status)=>{
        const result = await requestProductStatus(productId, status===1?2:1);
        if(result.status === 0){
            const {pageInfo, curPageSize} = this.state;
            this.showProducts(pageInfo.pageNum, curPageSize);
            message.success("修改商品状态成功")
        }else{
            message.error("请求失败，请稍后再试")
        }
    };
    
    toProductOf = (path, product)=>{    // 保存 pageNum、pageSize
        myMemory.memory.product.pageNum = this.state.pageInfo.pageNum;
        myMemory.memory.product.pageSize = this.state.curPageSize;
        this.props.history.push("/product/"+path, product);
    };
    
    componentDidMount(){
        this.handleSearch()
    }
    
    render(){
        const {columns, dataSource, isLoading, pageInfo, searchType} = this.state;
        const cardTitle = (
            <div className="card_title">
                <div className="card_title_left">
                    <Select
                        className="good_search_way"
                        defaultValue={searchType}
                        onChange={searchType=>this.setState({searchType})}
                    >
                        <Select.Option key="productName" value="productName">根据商品名称</Select.Option>
                        <Select.Option key="productDesc" value="productDesc">根据商品描述</Select.Option>
                    </Select>
                    <Input
                        className="good_search_keyword"
                        type="text"
                        placeholder="请输入关键字"
                        onChange={(e)=>this.setState({searchName: e.target.value})}
                    />
                    <Button className="good_search_btn" onClick={this.handleSearch}>搜索</Button>
                </div>
                <Button
                    className="card_title_right_btn"
                    onClick={()=>this.toProductOf("edit", {})}
                >
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
                        current: pageInfo.pageNum,
                        showSizeChanger: true,
                        defaultPageSize: pageInfo.pageSize || this.state.curPageSize,
                        pageSizeOptions: ["2", "3", "4", "5", "6", "7", "8", "9", "10"],
                        showQuickJumper: true,
                        total: pageInfo.total,
                        showTotal: (total=>"共 "+total+" 条数据"),
                        onChange: this.handleOnChange,
                        onShowSizeChange: this.handleOnChange
                    }}
                />
            </Card>
        )
    }
}
