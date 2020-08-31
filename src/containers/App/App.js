import React from 'react';
import {HomePage} from "../../components/pages/HomePage/HomePage";
import {FaqPage} from "../../components/pages/FaqPage/FaqPage";

import {Switch, Route} from "react-router-dom";
import './App.less';

export const App = () => {
    return (
        <span>
            <Switch>
                <Route exact path={process.env.PUBLIC_URL} component={HomePage}/>
                <Route exact path={process.env.PUBLIC_URL + "/faq"} component={FaqPage}/>
            </Switch>
        </span>
    );
};
