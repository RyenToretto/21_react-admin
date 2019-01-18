import React, { Component } from 'react';
import {Switch, Route, Redirect} from "react-router-dom";

import ProductShow from "./Show/ProductShow";
import ProductEdit from "./Edit/ProductEdit";
import ProductDetail from "./Detail/ProductDetail";

import "./css/Product.css";

export default class Product extends Component {
    render(){
        return (
            <Switch>
                <Route path="/admin/products/product/show" component={ProductShow} />
                <Route path="/admin/products/product/edit" component={ProductEdit} />
                <Route path="/admin/products/product/detail" component={ProductDetail} />
                <Redirect to="/admin/products/product/show"/>
            </Switch>
        )
    }
}
