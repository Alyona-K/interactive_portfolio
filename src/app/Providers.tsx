import { ReactNode } from "react";
import { BrowserRouter } from "react-router-dom";
import ErrorBoundary from "@/app/ErrorBoundary";

type ProvidersProps = { children: ReactNode };

/* --------------------------------------------------
   Providers Component
   Wraps application with essential context providers:
   - ErrorBoundary: catches runtime errors and prevents full app crash
   - BrowserRouter: handles routing with optional basename from env
-------------------------------------------------- */
export const Providers = ({ children }: ProvidersProps) => {
  const basename = import.meta.env.VITE_BASENAME || "/";

  return (
    <ErrorBoundary>
      <BrowserRouter basename={basename}>{children}</BrowserRouter>
    </ErrorBoundary>
  );
};

