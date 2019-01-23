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
                <Route path="/product/show" component={ProductShow} />
                <Route path="/product/edit" component={ProductEdit} />
                <Route path="/product/detail" component={ProductDetail} />
                <Redirect to="/product/show"/>
            </Switch>
        )
    }
}
