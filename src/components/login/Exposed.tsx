import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import App from "src/App";
import AppHeader from "../../commons/AppHeader";
import LoginComponent from "./LoginComponent";
import { Register } from "./Register";


const Exposed = () => {

    return (
        
        <HashRouter>
            <AppHeader ></AppHeader>
            <Switch>
                <Route path="/login" component={LoginComponent} />
                <Route path="/register" component={Register} />
                <Route  path="/" component={App} />
            </Switch>
        </HashRouter>
    )
}

export default Exposed;