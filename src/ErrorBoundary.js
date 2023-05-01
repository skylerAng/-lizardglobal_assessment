import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, errorInfo) {
    // Update state with the error
    this.setState({ hasError: true });
    // You can also log the error to an error reporting service
    // like Sentry or Rollbar here
  }

  render() {
    if (this.state.hasError) {
      // Fallback UI for the error
      return <h1>Something went wrong.</h1>;
    }

    // Render the children normally
    return this.props.children;
  }
}

export default ErrorBoundary;
