import React from 'react';
import { routesConfig } from '../../common/routesConfig'
import {Switch, Route} from "react-router-dom";
import './App.less';

export const App = () => {
    return (
        <span>
            <Switch>
                {routesConfig.map((route) => (
                    <Route key={route.path} path={route.path} {...route} />
                ))}
            </Switch>
        </span>
    );
};
