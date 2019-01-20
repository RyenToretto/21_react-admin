import React, { Component } from 'react';

import {Icon, message} from "antd";

import "./css/ProductDetail.css";
import {requestQueryClass} from "../../../../api/requestAPI";

export default class ProductDetail extends Component {
    constructor(props){
        super(props);
        this.state = {
            firstName: "",
            secondName: ""
        }
    }
    /****
         categoryId: "5c4139ac6943f01eb45bab60"
         desc: "神级表情包"
         detail: "<p>888</p>↵"
         imgs: ["image-1547987050108.jpg"]
         key: "5c44686a56f7d318a8cb98a2"
         name: "切克闹"
         pCategoryId: "5c401aabb8491a1b807fd9df"
         price: 777
         status: 1
     ****/
    
    async componentWillMount(){
        const {pCategoryId, categoryId} = this.props.location.state;
        let firstName = "", secondName = "", result;
    
        result = await requestQueryClass(0);
        if(result.status === 0){
            if(pCategoryId === "0"){
                firstName = result.data.find(each=>(each._id===categoryId)).name;
            }else{
                firstName = result.data.find(each=>each._id===pCategoryId).name;
                result = await requestQueryClass(pCategoryId);
                if(result.status === 0){
                    secondName = result.data.find(each=>(each._id===categoryId)).name;
                }else{
                    message.error(42+": 请求错误，请稍后重试")
                }
            }
        }else{
            message.error(46+": 请求错误，请稍后重试")
        }
        console.log("componentWillMount :  "+firstName+"----"+secondName);
        
        this.setState({
            firstName,
            secondName
        })
    }
    
    render(){
        const {firstName, secondName} = this.state;
        const {name, desc, pCategoryId, price, imgs, detail} = this.props.location.state;
        
        console.log("render :  "+firstName+"----"+secondName);
        return (
            <div className="product_detail">
                <h3 className="product_detail_nav">
                    <a href="javascript:" onClick={()=>{this.props.history.goBack()}}>
                        <Icon type="arrow-left"/>
                    </a>
                    <span>商品详情</span>
                </h3>
                <div className="detail_box">
                    <div className="product_detail_name">
                        <div>商品名称：</div>
                        <div>{name}</div>
                    </div>
                    <div className="product_detail_desc">
                        <div>商品描述：</div>
                        <div>{desc}</div>
                    </div>
                    <div className="product_detail_class">
                        <div>所属分类：</div>
                        <div>{
                            firstName === ""?null:((pCategoryId==="0")?(firstName):
                                (firstName+" → "+secondName))
                        }</div>
                    </div>
                    <div className="product_detail_price">
                        <div>商品价格：</div>
                        <div>{price+" 元"}</div>
                    </div>
                    <div className="product_detail_img">
                        <div>商品图片：</div>
                        <div>{
                            imgs.map((img, index)=><img key={index} src={"http://localhost:5000/upload/"+img} alt="商品 logo"/>)
                        }</div>
                    </div>
                    <div className="product_detail_content">
                        <div>商品详情：</div>
                        <div dangerouslySetInnerHTML={{__html:detail}}>{}</div>
                    </div>
                </div>
            </div>
        )
    }
}
