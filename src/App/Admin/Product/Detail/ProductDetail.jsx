import React, { Component } from 'react';

import {Card, Button, Icon, Table, message, Modal, Form, Input, Select} from "antd";

import "./css/ProductDetail.css";

export default class ProductDetail extends Component {
    
    render(){
        return (
            <Card
                className="product_detail"
                bordered={false}
                title={1}
            >
                ProductDetail
            </Card>
        )
    }
}
