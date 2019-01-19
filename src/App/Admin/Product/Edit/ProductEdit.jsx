import React, { Component } from 'react';

import {Icon, Card, Button, Table, message, Modal, Form, Input, Select} from "antd";

import "./css/ProductEdit.css";

export default class ProductEdit extends Component {
    constructor(props){
        super(props);
        this.state = {
            isAdd: true
        }
    }
    render(){
        return (
            <div className="product_edit">
                <h3 className="product_nav">
                    <a href="javascript:" onClick={()=>{this.props.history.goBack()}}><Icon type="arrow-left"/></a>
                    <span>{this.state.isAdd?"添加商品":"编辑商品信息"}</span>
                </h3>
                <div className="product_info_box">
                    <div>
                        <label>商品名称：
                            <Input className="edit_product_name" type="text" defaultValue=""/>
                        </label>
                    </div>
                    <div>
                        <label>商品描述：
                            <Input className="edit_product_desc" type="text" defaultValue=""/>
                        </label>
                    </div>
                    <div className="padding_zero">
                        所属分类：
                        <Select className="edit_product_category" defaultValue={2}>
                            <Select.Option key={1} value={1}>1</Select.Option>
                            <Select.Option key={2} value={2}>2</Select.Option>
                            <Select.Option key={3} value={3}>3</Select.Option>
                        </Select>
                        <Select className="edit_product_category" defaultValue="c">
                            <Select.Option key="a" value="a">a</Select.Option>
                            <Select.Option key="b" value="b">b</Select.Option>
                            <Select.Option key="c" value="c">c</Select.Option>
                        </Select>
                    </div>
                    <div>
                        <label className="edit_product_price">商品价格：
                            <Input type="text" defaultValue="" addonAfter="元"/>
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
