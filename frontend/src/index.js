import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from "react-router-dom";
import App from './container/App';
import * as serviceWorker from './serviceWorker';
import Login from "./container/Login";

ReactDOM.render(
    <Router basename={"/print"}>
        <div>
            <Route path={"/"} exact component={Login}/>
            <Route path={"/dashboard"} component={App}/>
        </div>
    </Router>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
