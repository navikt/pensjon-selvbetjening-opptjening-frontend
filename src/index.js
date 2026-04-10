import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { App } from "./containers/App/App";
import * as serviceWorker from "./serviceWorker";
import store from "./redux/index";
import { Suspense } from "react";
import NavFrontendSpinner from "nav-frontend-spinner";
import { Normaltekst } from "nav-frontend-typografi";
import "./i18n";
import "./index.css";
import { UnleashContainer } from "./containers/UnleashContainer/UnleashContainer";
import ErrorBoundary from "./ErrorBoundary";
import { isDev } from "./common/utils";

import "nav-frontend-core/dist/main.css";
import "nav-frontend-alertstriper-style/dist/main.css";
import "nav-frontend-chevron-style/dist/main.css";
import "nav-frontend-ekspanderbartpanel-style/dist/main.css";
import "nav-frontend-grid-style/dist/main.css";
import "nav-frontend-knapper-style/dist/main.css";
import "nav-frontend-lenkepanel-style/dist/main.css";
import "nav-frontend-lenker-style/dist/main.css";
import "nav-frontend-paneler-style/dist/main.css";
import "nav-frontend-skjema-style/dist/main.css";
import "nav-frontend-spinner-style/dist/main.css";
import "nav-frontend-tabell-style/dist/main.css";
import "nav-frontend-typografi-style/dist/main.css";
import "nav-frontend-veileder-style/dist/main.css";

const loadDecoratorAndBanner = () => {
  const decoratorUrl = process.env.REACT_APP_DECORATOR_URL;
  const representasjonBannerUrl = process.env.REACT_APP_REPRESENTASJON_BANNER;

  if (decoratorUrl) {
    const stylesheet = document.createElement("link");
    stylesheet.rel = "stylesheet";
    stylesheet.href = `${decoratorUrl}/css/client.css`;
    document.head.appendChild(stylesheet);

    const envElement = document.createElement("div");
    envElement.id = "decorator-env";
    envElement.dataset.src = `${decoratorUrl}/env?chatbot=false`;
    document.body.appendChild(envElement);

    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = `${decoratorUrl}/client.js`;
    document.body.appendChild(script);
  }

  if (representasjonBannerUrl) {
    const moduleScript = document.createElement("script");
    moduleScript.type = "module";
    moduleScript.src = `${representasjonBannerUrl}/banner.js`;
    moduleScript.async = true;
    document.body.appendChild(moduleScript);
  }
};

if (!isDev()) {
  loadDecoratorAndBanner();
}

// TODO: Ta i bruk Umami.

ReactDOM.render(
  <ErrorBoundary>
    <Provider store={store}>
      <Suspense fallback={<NavFrontendSpinner />}>
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
  document.getElementById("root"),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
