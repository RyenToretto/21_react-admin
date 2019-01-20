import React, { Component } from 'react';

import {Icon, Input, Select, Button, message, Modal, Card, Table, Form} from "antd";
import {requestQueryClass} from "../../../../api/requestAPI";

import "./css/ProductEdit.css";

export default class ProductEdit extends Component {
    constructor(props){
        super(props);
        this.state = {
            product: {},
            isAdd: true,
            subChioce: "未选择",
            category1: [],
            category2: []
        }
    }
    
    getCategoryNames = async (categoryId)=>{
        const result = await requestQueryClass(categoryId);
        if(result.status === 0){
            return result.data
        }else{
            message.error("请求 category 列表异常")
        }
    };
    
    deal0List = async ()=>{
        const category1Arr = await this.getCategoryNames(0);
        let category1 = category1Arr.map(each=>({
            categoryId: each._id,
            categoryName: each.name
        }));
        this.setState({
            category1
        });
    };
    
    dealSubList = async (id)=>{
        const category2Arr = await this.getCategoryNames(id);
        let category2 = category2Arr.map(each=>({
            categoryId: each._id,
            categoryName: each.name
        }));
        
        this.setState({
            category2
        });
    };
    
    /***********************************************************/
    input2Product = (e, type)=>{
        const {product} = this.state;
        product[type] = e.target.value;
        this.setState({product});
    };
    
    handle0Category = (parentId)=>{
        let {product} = this.state;
        product.pCategoryId = "0";
        product.categoryId = parentId;
        
        this.setState({
            product,
            isAdd: false,
            subChioce: "未选择",
        });
        this.dealSubList(parentId);
    };
    
    handleSubCategory = (categoryId)=>{
        let {product} = this.state;
        if(product.pCategoryId === "0"){
            product.pCategoryId = product.categoryId;
        }
        product.categoryId = categoryId;
        this.setState({product, subChioce: categoryId});
    };
    
    componentWillMount(){
        const product = this.props.location.state;
        let isAdd = true;
        let subChioce = "未选择";
        if(product.key){
            isAdd = false;
            subChioce = product.categoryId;
            if(product.pCategoryId === "0"){
                subChioce = "未选择";
            }
        }
        this.setState({
            product,
            isAdd,
            subChioce
        })
    }
    
    componentDidMount(){
        const {product, isAdd} = this.state;
        this.deal0List();    // 获取为 0 的列表
        if(!isAdd){ // 如果是 编辑商品
            // 则还要获取 product.pCategoryId 的列表
            this.dealSubList(product.pCategoryId);
        }
    }
    
    render(){
        const {product, isAdd, subChioce, category1, category2} = this.state;
        return (
            <div className="product_edit">
                <h3 className="product_nav">
                    <a href="javascript:" onClick={()=>{this.props.history.goBack()}}><Icon type="arrow-left"/></a>
                    <span>{isAdd?"添加商品":"编辑商品"}</span>
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
                            onChange={this.handle0Category}
                            defaultValue={
                                isAdd?"未选择":
                                    (product.pCategoryId==="0"?product.categoryId:
                                        product.pCategoryId)
                            }
                        >
                            {
                                category1.map(each=>(
                                    <Select.Option
                                        key={each.categoryId}
                                        value={each.categoryId}
                                    >
                                        {each.categoryName}
                                    </Select.Option>
                                ))
                            }
                        </Select>
                        {isAdd?null:(
                            <Select
                                className="edit_product_category"
                                onChange={this.handleSubCategory}
                                defaultValue={subChioce}
                                value={subChioce}
                            >
                                {
                                    category2.map(each=>(
                                        <Select.Option
                                            key={each.categoryId}
                                            value={each.categoryId}
                                        >
                                            {each.categoryName}
                                        </Select.Option>
                                    ))
                                }
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
