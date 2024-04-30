import React from "react"
import App from "./App"
import { createRoot } from 'react-dom/client';

//ReactDom.render(<App/>, document.getElementById("root"))

const root = createRoot(document.getElementById('root'));
root.render(<App/>);