import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

// render app on element with root id
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
