import React, { Component } from 'react';

import {withRouter, NavLink} from "react-router-dom";
import {Menu, Icon} from "antd";
import {menuList,getCurKey} from "./config/menuConfig";
import myLocalStorage from "../../../tools/storeLocalStorage";

import "./css/LeftNav.css";
import theLogo from "../../Login/img/logo.png";

class LeftNav extends Component {
    
    menuItemArr = (menuConfig)=>{
        const curUser = myLocalStorage.local("user_key");
        
        const isAdmin = curUser.username === "admin";
        const curPaths = new Set(curUser.role.menus);
        
        return menuConfig.reduce((pre,item)=>{
            let menuItem = null;
            if(item.children){
                let shouldContinue = false;
                for(let i=0; i<item.children.length; i++){
                    shouldContinue = curPaths.has(item.children[i].key);
                    if(shouldContinue){
                        break;
                    }
                }
                if(item.key==="/home" || isAdmin || shouldContinue){
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
                }
            }else{
                if(item.key==="/home" || isAdmin || curPaths.has(item.key)){
                    menuItem = (
                        <Menu.Item key={item.key}>
                            <NavLink to={item.key}>
                                <Icon type={item.icon}/>
                                {item.title}
                            </NavLink>
                        </Menu.Item>
                    )
                }
            }
            
            menuItem && pre.push(menuItem);
            return pre;
        }, []);
    };
    
    componentWillMount(){
        this.itemArr = this.menuItemArr(menuList)
    }
    
    render(){
        let curKey = this.props.location.pathname;
        let openKey = "/home";
        const ret = getCurKey(curKey, menuList);
        if(ret && ret.preKey && ret.preKey.key){
            openKey = ret.preKey.key;
        }
        if(ret.key){
            curKey = ret.key?ret.key.key:"/home";
        }
        
        return (
            <div className="left_nav">
                <NavLink id="home_a" to="/home">
                    <img id="home_img" src={theLogo} alt="Logo"/>
                    <h2>后台管理系统</h2>
                </NavLink>
                
                <Menu
                    defaultSelectedKeys={[curKey]}
                    defaultOpenKeys={[openKey]}
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
