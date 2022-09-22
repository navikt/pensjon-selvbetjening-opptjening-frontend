import React from 'react';
import {logger} from "./common/logging";
import Alertstripe from "nav-frontend-alertstriper";
import { withTranslation } from 'react-i18next';
import {Knapp} from "nav-frontend-knapper";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, count: 0 };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error(`Uventet feil fra appen under render: ${error}`, errorInfo);
    logger.error(`Uventet feil fra appen under render: ${error} ${errorInfo}`);
    this.setState({ count: this.state.count + 1})
  }

  render() {
    const { t } = this.props;
    if(this.state.hasError && this.state.count === 3) {
      return <div className="mainBody" id="maincontent" tabIndex="-1">
        <Alertstripe type="feil">{t("error-status-common")}</Alertstripe>
        <Knapp onClick={() => window.location.reload()}>{t("error-proev-igjen")}</Knapp>
      </div>
    }
    return this.props.children;
  }
}

export default withTranslation(ErrorBoundary);