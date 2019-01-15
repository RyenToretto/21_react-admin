import React, { Component } from 'react';

import {Redirect, Switch, Route} from "react-router-dom";
import {Layout} from 'antd';

import LeftNav from "./LeftNav/LeftNav";

import Home from "./Home/Home";
import Category from "./Category/Category";
import Product from "./Product/Product";
import User from "./User/User";
import Role from "./Role/Role";
import Bar from "./Bar/Bar";
import Line from "./Line/Line";
import Pie from "./Pie/Pie";

import MyTools from "../../tools/MyTools";

import "./css/Admin.css";

export default class Admin extends Component {
    render(){
        const {
            Header, Sider, Content,
        } = Layout;
        const user_key = MyTools.memory.user_key;
        if(user_key && user_key._id){
            return (
                <div id="admin_page">
                    <Layout className="layout_box">
                        
                        <Sider className="sider_box" width="320px">
                                <LeftNav/>
                        </Sider>
                        
                        <Layout>
                            <Header className="header_box">Header</Header>
                            <Content className="contnet_box">
                                <Switch>
                                    <Route path="/admin/home" component={Home}/>
                                    <Route path='/admin/category' component={Category}/>
                                    <Route path='/admin/product' component={Product}/>
                                    <Route path='/admin/user' component={User}/>
                                    <Route path='/admin/role' component={Role}/>
                                    <Route path='/admin/charts/bar' component={Bar}/>
                                    <Route path='/admin/charts/line' component={Line}/>
                                    <Route path='/admin/charts/pie' component={Pie}/>
                                    <Redirect to='/admin/home'/>
                                </Switch>
                            </Content>
                        </Layout>
                        
                    </Layout>
                </div>
            )
        }else{
            return (
                <Redirect to="/login"/>
            )
        }
    }
}
