import React from "react";
import ReactDOM from "react-dom/client";
import "@/shared/i18n"; // Initialize i18n for translations
import App from "./App";
import { Providers } from "./Providers";
import "@/shared/styles/styles.scss"; // Global styles

/* --------------------------------------------------
   Application Entry Point
   Mounts React app with:
   - React.StrictMode for highlighting potential problems
   - Providers wrapping App (routing, error boundary, contexts)
   - Global styles and i18n initialized before render
-------------------------------------------------- */
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Providers>
      <App />
    </Providers>
  </React.StrictMode>,
);

