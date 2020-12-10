import React from 'react';
import {routesConfig} from '../../common/routesConfig'
import {Switch, Route, Redirect} from "react-router-dom";
import './App.less';

export const App = () => {
    return (
        <div>
            <Switch>
                {routesConfig.map((route) => (
                    <Route key={route.path} path={route.path} {...route} />
                ))}
                <Redirect to={"/nb/"} />
            </Switch>
        </div>
    );
};
