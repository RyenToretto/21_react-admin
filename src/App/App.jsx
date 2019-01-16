import React, { Component } from 'react';

import {BrowserRouter, Switch, Route} from "react-router-dom";

import Login from "./Login/Login";
import Admin from "./Admin/Admin";

import "./css/base.css";
import "./css/index.css";

export default class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/login" component={Login} />
                    <Route path="/admin" component={Admin} />
                    <Route path="/" component={Admin} />
                </Switch>
            </BrowserRouter>
        );
    }
};
