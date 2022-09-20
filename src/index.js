import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import {Provider} from "react-redux";
import {App} from './containers/App/App';
import * as serviceWorker from './serviceWorker';
import store from './redux/index';
import { Suspense} from 'react' ;
import NavFrontendSpinner from "nav-frontend-spinner";
import { Normaltekst } from 'nav-frontend-typografi';
import './i18n';
import './index.less';
import {UnleashContainer} from "./containers/UnleashContainer/UnleashContainer";
import {initAmplitude} from "./common/amplitude";
import ErrorBoundary from "./ErrorBoundary";

initAmplitude();
ReactDOM.render(
    <ErrorBoundary>
        <Provider store={store}>
            <Suspense fallback={<NavFrontendSpinner/>}>
                <UnleashContainer>
                    <Router basename={process.env.PUBLIC_URL}>
                        <Normaltekst tag="div">
                            <App />
                        </Normaltekst>
                    </Router>
                </UnleashContainer>
            </Suspense>
        </Provider>
    </ErrorBoundary>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
