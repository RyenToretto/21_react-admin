import React, { Component } from 'react';

import {Icon, Input, Select, Button, message} from "antd";
import {requestQueryClass, requestCommitUpdate} from "../../../../api/requestAPI";

import RichTextEditor from "./RichTextEditor/RichTextEditor";
import ImageCom from "./ImageCom/ImageCom";

import "./css/ProductEdit.css";

export default class ProductEdit extends Component {
    constructor(props){
        super(props);
        this.state = {
            product: {},
            isAdd: true,
            subChioce: "未选择",
            category1: [],
            category2: [],
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
    
    commitBtn = async ()=>{
        let {product} = this.state;
        product.detail = this.refs.RichTextEditor.getRichTextEditor();
        product.imgs = this.refs.ImageCom.getImgs();
        
        this.refs.ImageCom.handleCommit();
        //const {name, desc, categoryId, pCategoryId, price, imgs, detail} = product;
        const result = await requestCommitUpdate(product);
        if(result.status === 0){
            message.success("提交成功");
            this.props.history.goBack();
        }else{
            console.log(result);
            message.error("提交错误，请稍后重试")
        }
    };
    
    allReturn = ()=>{
        this.props.history.goBack();
        this.refs.ImageCom.handleReturn();
    };
    
    componentWillMount(){
        let product = this.props.location.state;
        let isAdd = true;
        let subChioce = "未选择";
        if(product.key){
            product._id = product.key;
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
            // 则还要获取
            if(product.pCategoryId === "0"){    // product.categoryId 的列表
                this.dealSubList(product.categoryId);
            }else{    // product.pCategoryId 的列表
                this.dealSubList(product.pCategoryId);
            }
        }
    }
    
    render(){
        const {product, isAdd, subChioce, category1, category2} = this.state;
        return (
            <div className="product_edit">
                <h3 className="product_nav">
                    <a href="javascript:" onClick={this.allReturn}><Icon type="arrow-left"/></a>
                    <span>{isAdd?"添加商品":"编辑商品"}</span>
                </h3>
                <div className="product_info_box">
                    <div>
                        <label>
                            <div className="product_detail_edit">商品名称：</div>
                            <Input
                                className="edit_product_name"
                                type="text"
                                onChange={(e)=>this.input2Product(e, "name")}
                                defaultValue={isAdd?"":product.name}
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            <div className="product_detail_edit">商品描述：</div>
                            <Input
                                className="edit_product_desc"
                                type="text"
                                onChange={(e)=>this.input2Product(e, "desc")}
                                defaultValue={isAdd?"":product.desc}
                            />
                        </label>
                    </div>
                    <div className="padding_zero">
                        <div className="product_detail_edit">所属分类：</div>
                        {category1.length>0?(
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
                        ):null}
                        {isAdd?null:
                            (category2.length>0?(
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
                            ):null)}
                    </div>
                    <div>
                        <label className="edit_product_price">
                            <div className="product_detail_edit">商品价格：</div>
                            <Input
                                type="text"
                                addonAfter="元"
                                onChange={(e)=>this.input2Product(e, "price")}
                                defaultValue={isAdd?"":product.price}/>
                        </label>
                    </div>
                    <div>
                        <div className="product_detail_edit">商品图片：</div>
                        <ImageCom imgs={this.state.product.imgs} ref="ImageCom"/>
                    </div>
                    <div className="rich_text_editor">
                        <div className="product_detail_edit">商品详情：</div>
                        <div><RichTextEditor ref="RichTextEditor" detail={product.detail}/></div>
                    </div>
                </div>
                <Button
                    type="primary"
                    className="product_commit_btn"
                    onClick={this.commitBtn}
                >
                    提交
                </Button>
            </div>
        )
    }
}
