import React from 'react';
import {HomePage} from "./components/pages/HomePage";
import './App.css';
import {Switch, Route} from "react-router-dom";

export const App = () => {
    return (
        <span>
            <Switch>
                <Route exact path="/pensjon/opptjening" component={HomePage}/>
            </Switch>
        </span>
    );
};
