import React, { Component } from 'react';

import {BrowserRouter, Switch, Route} from "react-router-dom";

import Login from "./Login/Login";
import Admin from "./Admin/Admin";

export default class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/login" component={Login} />
                    <Route path="/admin" component={Admin} />
                    <Route path="/" component={Login} />
                </Switch>
            </BrowserRouter>
        );
    }
};
