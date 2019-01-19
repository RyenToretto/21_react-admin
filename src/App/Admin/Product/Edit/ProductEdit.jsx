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
            </div>
        )
    }
}
