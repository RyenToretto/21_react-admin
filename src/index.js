import React from 'react';
import ReactDOM from 'react-dom';

import App from './App/App';

import myLocalStorage from "./tools/storeLocalStorage";
import MyTools from "./tools/MyTools";
MyTools.memory.user_key = myLocalStorage.local("user_key");

ReactDOM.render((
        <App/>
), document.getElementById('root'));
