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
                <Route exact path="/">
                    <Redirect to="/nb/"/>
                </Route>
                <Route path="/:lng([a-z]{2})">
                    {({ match, location }) => {
                        const params = match ? match.params : {};
                        const { lng = 'nb' } = params;

                        const { pathname } = location;
                        if (!pathname.includes(`/${lng}/`)) {
                            return <Redirect to={`/${lng}/`} />;
                        }

                        return (
                            <Redirect to={`/${lng}/404`} />
                        );
                    }}
                </Route>
                <Redirect to = {"/nb/404"}/>
            </Switch>
        </div>
    );
};
