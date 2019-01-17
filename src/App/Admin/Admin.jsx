import React, { Component } from 'react';

import {Redirect, Switch, Route} from "react-router-dom";
import {Layout, Row, Col, message, Modal} from 'antd';

import LeftNav from "./LeftNav/LeftNav";

import Home from "./Home/Home";
import Category from "./Category/Category";
import Product from "./Product/Product";
import User from "./User/User";
import Role from "./Role/Role";
import Bar from "./Bar/Bar";
import Line from "./Line/Line";
import Pie from "./Pie/Pie";

import {formateTime} from "../../tools/MyTools";
import storeLocal from "../../tools/storeLocalStorage";
import storeMemory from "../../tools/storeMemory";
import {requestWeather} from "../../api/requestAPI";
import {getCurKey, menuList} from "./LeftNav/config/menuConfig";

import "./css/Admin.css";

export default class Admin extends Component {
    constructor(props){
        super(props);
        this.state = {
            curTime:"",
            dayPictureUrl: "😁",
            weather: "😄"
        }
    }
    
    async componentDidMount(){
        const {dayPictureUrl, weather} = await requestWeather("北京");
        this.setState({
            dayPictureUrl,
            weather
        });
        
        this.intervalId = window.setInterval(()=>{
            const curTime = formateTime(Date.now());
            this.setState({
                curTime
            });
        }, 1000)
    }
    
    componentWillUnmount(){
        window.clearInterval(this.intervalId);
    }
    
    exitLogin = ()=>{
        Modal.confirm({
            content:"确认退出？",
            onOk: ()=>{
                storeLocal.remove("user_key");
                this.props.history.replace("/login");
                message.info("已退出登录");
            },
            onCancel: ()=>{
                return "";
            }
        })
    };
    
    render(){
        const {
            Header, Sider, Content,
        } = Layout;
        const {curTime, dayPictureUrl, weather} = this.state;
        const user_key = storeMemory.memory.user_key;
        if(user_key && user_key._id){
            const ret = getCurKey(this.props.location.pathname, menuList);
            let curKeyTitle = "/admin/home";
            if(ret && ret.key && ret.key.title){
                curKeyTitle = ret.key.title;
            }
            const user_name = user_key.username;
            
            return (
                <div id="admin_page">
                    <Layout className="layout_box">
                        
                        <Sider className="sider_box" width="calc(24vw)">
                                <LeftNav/>
                        </Sider>
                        
                        <Layout>
                            <Header className="header_box">
                                <Row className="header_top">
                                    <span  className="wellcome">
                                        {user_name}&nbsp;&nbsp;&nbsp;欢迎回来
                                    </span>
                                    <a className="exit_login" href="javascript:" onClick={this.exitLogin}>退出</a>
                                </Row>
                                
                                <Row className="header_bottom">
                                    <Col span={4}>
                                        <div className="breadcrumb_title">
                                            {curKeyTitle}
                                            <div className="breadcrumb">
                                            </div>
                                        </div>
                                    </Col>
                                    <Col span={20}>
                                        <span className="weather_time">{curTime}</span>
                                        <img className="weather_img" src={dayPictureUrl} alt="😁"/>
                                        <span className="weather_detail">{weather}</span>
                                    </Col>
                                </Row>
                                
                            </Header>
                            <Content className="contnet_box">
                                <Switch>
                                    <Route path="/admin/home" component={Home}/>
                                    <Route path='/admin/products/category' component={Category}/>
                                    <Route path='/admin/products/product' component={Product}/>
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
