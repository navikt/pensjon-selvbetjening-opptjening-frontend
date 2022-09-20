import React from 'react';
import {logger} from "./common/logging";

class ErrorBoundary extends React.Component {
  static getDerivedStateFromError() {}

  componentDidCatch(error, errorInfo) {
    console.error(`Uventet feil fra appen under render: ${error}`, errorInfo);
    logger.error(`Uventet feil fra appen under render: ${error} ${errorInfo}`);
  }

  render() {
    return this.props.children;
  }
}

export default ErrorBoundary;