import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import './index.css';
import {App} from './App';
import {LoadContainer} from "./containers/LoadContainer";
import * as serviceWorker from './serviceWorker';
import store from './redux/index';

ReactDOM.render(
    <Provider store={store}>
        <LoadContainer>
            <App />
        </LoadContainer>
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
