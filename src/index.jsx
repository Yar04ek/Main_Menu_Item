import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import mainMenuItem from './MainMenuItem';

export function runApp(container) {
 if (!container) {
  console.error("Root container is missing.");
  return;
 }

 if (container.hasAttribute('data-react-root')) {
  console.warn("React root already exists, skipping reinitialization.");
  return;
 }

 container.setAttribute('data-react-root', 'true');
 createRoot(container).render(<App />);
}

export { mainMenuItem };


if (typeof document !== 'undefined') {
 document.addEventListener("DOMContentLoaded", () => {
  const rootElement = document.getElementById('root');
  if (rootElement) {
   try {
    runApp(rootElement);
   } catch (error) {
    console.error("Error during app initialization:", error);
   }
  } else {
   console.error("Root element not found, app not mounted.");
  }
 });
}


if (typeof window !== 'undefined') {
 window.runApp = runApp;
}
