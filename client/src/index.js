import React from "react"
import App from "./App"
import { createRoot } from 'react-dom/client';
import { StrictMode } from "react";

//ReactDom.render(<App/>, document.getElementById("root"))

const root = createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
  );