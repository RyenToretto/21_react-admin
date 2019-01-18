import React, { Component } from 'react';

import {Card, Button, Icon, Table, message, Modal, Form, Input, Select} from "antd";

import "./css/ProductEdit.css";

export default class ProductEdit extends Component {
    
    render(){
        return (
            <Card
                className="product_edit"
                bordered={false}
                title={1}
            >
                ProductEdit
            </Card>
        )
    }
}
