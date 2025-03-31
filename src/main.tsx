
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// For debugging purposes, you can view permissions in console
const debugPermissions = () => {
  console.log("Institution permissions:", localStorage.getItem("institutionPermissions"));
  console.log("Current user:", localStorage.getItem("user"));
};

// Uncomment this line to debug permissions
debugPermissions();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
