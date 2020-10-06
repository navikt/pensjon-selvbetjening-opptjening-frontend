import React from 'react';
import {basePath, routesConfig} from '../../common/routesConfig'
import {Switch, Route, Redirect} from "react-router-dom";
import './App.less';

export const App = () => {
    return (
        <span>
            <Switch>
                {routesConfig.map((route) => (
                    <Route key={route.path} path={route.path} {...route} />
                ))}
                <Redirect to={basePath + "/404"} />
            </Switch>
        </span>
    );
};
