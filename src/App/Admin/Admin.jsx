import React, { Component } from 'react';

import {Redirect} from "react-router-dom";

import MyTools from "../../tools/MyTools"

import "./css/Admin.css";

export default class Admin extends Component {
    render(){
        const user_key = MyTools.memory.user_key;
        if(user_key && user_key._id){
            return (
                <div id="admin_page">
                
                </div>
            )
        }else{
            return (
                <Redirect to="/login"/>
            )
        }
    }
}
