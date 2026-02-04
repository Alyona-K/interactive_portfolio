import React from "react";

type ErrorBoundaryState = { hasError: boolean };
type ErrorBoundaryProps = { children: React.ReactNode };

/* --------------------------------------------------
   ERROR BOUNDARY COMPONENT
   Catches runtime errors in child components.
   Provides fallback UI to prevent app crash.
   Logs errors for debugging.
-------------------------------------------------- */
class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  // Update state when an error is thrown in children
  static getDerivedStateFromError() {
    return { hasError: true };
  }

  // Side effect: log error details to console
  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("Uncaught error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      // Fallback UI shown when an error is caught
      return (
        <div role="alert" style={{ padding: "2rem", textAlign: "center" }}>
          Something went wrong. Please try refreshing the page.
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
