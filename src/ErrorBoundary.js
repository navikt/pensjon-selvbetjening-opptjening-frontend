import React from 'react';
import {logger} from "./common/logging";
import ErrorView from "./ErrorView";


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
    if(this.state.hasError && this.state.count === 3) {
      return <ErrorView/>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;