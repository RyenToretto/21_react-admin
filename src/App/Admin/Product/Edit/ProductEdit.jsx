import React, { Component } from 'react';

import {Icon, Card, Button, Table, message, Modal, Form, Input, Select} from "antd";

import "./css/ProductEdit.css";

export default class ProductEdit extends Component {
    constructor(props){
        super(props);
        this.state = {
            product: {},
            theTitle: "添加商品"
        }
    }
    
    input2Product = (e, type)=>{
        const {product} = this.state;
        product[type] = e.target.value;
        this.setState({product});
    };
    
    componentWillMount(){
        const product = this.props.location.state;
        let theTitle = "添加商品";
        if(product.key){
            theTitle = "编辑商品"
        }
        this.setState({
            product,
            theTitle
        })
    }
    /****
        key: "5c414dc66943f01eb45bab6b"
        name: "吉普牛仔裤"
        desc: "四季款"
        pCategoryId: "5c3f11eec04a871c08734977"
        categoryId: "5c401adfb8491a1b807fd9e3"
        price: 99
        imgs: ["image-1547783608353.jpg"]
        detail: "<p>Handsome boy.</p>"
        status: 1
     ****/
    render(){
        const {product, theTitle} = this.state;
        let isAdd = true;
        if(product.key){
            isAdd = false;
        }
        
        return (
            <div className="product_edit">
                <h3 className="product_nav">
                    <a href="javascript:" onClick={()=>{this.props.history.goBack()}}><Icon type="arrow-left"/></a>
                    <span>{theTitle}</span>
                </h3>
                <div className="product_info_box">
                    <div>
                        <label>商品名称：
                            <Input
                                className="edit_product_name"
                                type="text"
                                onChange={(e)=>this.input2Product(e, "name")}
                                defaultValue={isAdd?"":product.name}
                            />
                        </label>
                    </div>
                    <div>
                        <label>商品描述：
                            <Input
                                className="edit_product_desc"
                                type="text"
                                onChange={(e)=>this.input2Product(e, "desc")}
                                defaultValue={isAdd?"":product.desc}
                            />
                        </label>
                    </div>
                    <div className="padding_zero">
                        所属分类：
                        <Select
                            className="edit_product_category"
                            defaultValue={
                                isAdd?"未选择":
                                    (product.pCategoryId==="0"?product.categoryId:
                                        product.pCategoryId)
                            }
                        >
                            <Select.Option key="0" value="0">一级品类</Select.Option>
                            <Select.Option key="2" value="2">2</Select.Option>
                            <Select.Option key="3" value="3">3</Select.Option>
                        </Select>
                        {(isAdd || product.pCategoryId==="0")?null:(
                            <Select
                                className="edit_product_category"
                                defaultValue={product.categoryId}
                            >
                                <Select.Option key="a" value="0">不可能的 一级品类</Select.Option>
                                <Select.Option key="b" value="b">b</Select.Option>
                                <Select.Option key="c" value="c">c</Select.Option>
                            </Select>
                        )}
                    </div>
                    <div>
                        <label className="edit_product_price">商品价格：
                            <Input
                                type="text"
                                addonAfter="元"
                                onChange={(e)=>this.input2Product(e, "price")}
                                defaultValue={isAdd?"":product.price}/>
                        </label>
                    </div>
                    <div>
                        商品图片：
                            图图图图图
                    </div>
                    <div>
                        商品详情：
                            666666666666666666666666
                    </div>
                </div>
                <Button type="primary" className="product_commit_btn">提交</Button>
            </div>
        )
    }
}
