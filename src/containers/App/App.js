import React from 'react';
import {routesConfig} from '../../common/routesConfig'
import {Switch, Route, Redirect} from "react-router-dom";
import './App.css';

export const App = () => {
    return (
        <div>
            <Switch>
                {routesConfig.map((route) => (
                    <Route key={route.path} path={route.path} {...route} />
                ))}
                <Route exact path="/">
                    {({location}) => {
                        return(
                            <Redirect to={`/nb/${location.search}`}/>
                        );
                    }}
                </Route>
                <Route path="/:lng([a-z]{2})">
                    {({ match, location }) => {
                        const params = match ? match.params : {};
                        let { lng = 'nb' } = params;
                        const lang = ['nb', 'nn', 'en'].includes(lng) ? lng : 'nb';

                        return (
                            <Redirect to={`/${lang}/404/${location.search}`} />
                        );
                    }}
                </Route>
                <Redirect to = {"/nb/404"}/>
            </Switch>
        </div>
    );
}
;

