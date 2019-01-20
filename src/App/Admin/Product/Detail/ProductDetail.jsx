import React, { Component } from 'react';

import {Icon, message} from "antd";

import "./css/ProductDetail.css";
import {requestQueryClass} from "../../../../api/requestAPI";

function preventScroll(e){
    e.preventDefault();
}

export default class ProductDetail extends Component {
    constructor(props){
        super(props);
        this.state = {
            firstName: "",
            secondName: ""
        }
    }
    
    bigView = (e)=>{
        let newDiv = document.createElement("div");
        newDiv.id = "img"+Date.now();
        e.target.bigId = newDiv.id;
        
        newDiv.style.position = "fixed";
        newDiv.style.top = "0";
        newDiv.style.left = "0";
        newDiv.style.width = "100%";
        newDiv.style.height = "100%";
        newDiv.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
        newDiv.style.display = "flex";
        newDiv.style.justifyContent = "center";
        newDiv.style.alignItems = "center";
        
        let imgNode = e.target.cloneNode(true);
        imgNode.style.maxHeight = "90%";
        newDiv.appendChild(imgNode);
        
        document.body.appendChild(newDiv);
    
        document.body.addEventListener('mousewheel', preventScroll, false);
        newDiv.onclick = function () {
            document.body.removeChild(newDiv);
            document.body.removeEventListener('mousewheel', preventScroll, false);
        }
    };
    
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
        
        this.setState({
            firstName,
            secondName
        })
    }
    
    render(){
        const {firstName, secondName} = this.state;
        const {name, desc, pCategoryId, price, imgs, detail} = this.props.location.state;
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
                            imgs.map((img, index)=><img
                                key={index}
                                src={"http://localhost:5000/upload/"+img}
                                onClick={(e)=>this.bigView(e)}
                                alt="商品 logo"/>)
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
