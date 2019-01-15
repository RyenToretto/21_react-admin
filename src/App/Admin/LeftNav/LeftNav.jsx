import React, { Component } from 'react';

import {withRouter, NavLink} from "react-router-dom";
import {Menu, Icon} from "antd";
import menuConfig from "./config/menuConfig";

import "./css/LeftNav.css";
import theLogo from "../../Login/img/logo.png";

class LeftNav extends Component {
    
    menuItemArr = (menuConfig)=>{
        return menuConfig.reduce((pre,item)=>{
            let menuItem = null;
            if(item.children){
                menuItem = (
                    <Menu.SubMenu
                        key={item.key}
                        title={
                            <span>
                                <Icon type={item.icon}/>
                                <span>
                                    {item.title}
                                </span>
                            </span>
                        }
                    >
                        {
                            this.menuItemArr(item.children)
                        }
                    </Menu.SubMenu>
                )
            }else{
                menuItem = (
                    <Menu.Item key={item.key}>
                        <NavLink to={item.key}>
                            <Icon type={item.icon}/>
                            {item.title}
                        </NavLink>
                    </Menu.Item>
                )
            }
            pre.push(menuItem);
            return pre;
        }, []);
    };
    
    componentWillMount(){
        this.itemArr = this.menuItemArr(menuConfig)
    }
    
    render(){
        const lastPath = this.props.location.pathname;
        return (
            <div className="left_nav">
                <NavLink id="home_a" to="/admin">
                    <img id="home_img" src={theLogo} alt="Logo"/>
                    <h2>后台管理系统</h2>
                </NavLink>
    
                <Menu
                    defaultSelectedKeys={lastPath}
                    mode="inline"
                    theme="dark"
                >
                    {this.itemArr}
                </Menu>
            </div>
        )
    }
}

export default withRouter(LeftNav);
