
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// For debugging purposes, you can view permissions in console
const debugPermissions = () => {
  console.log("Admin permissions:", localStorage.getItem("adminPermissions"));
  console.log("Teacher permissions:", localStorage.getItem("teacherPermissions"));
  console.log("Student permissions:", localStorage.getItem("studentPermissions"));
};

// Uncomment this line to debug permissions
// debugPermissions();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
