import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import AppContainerIndexedDB from "./container/AppContainerIndexedDB.jsx";
import AppContainerQuintaDB from "./container/AppContainerQuintaDB.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <div>
    {/* <AppContainerIndexedDB /> */}
    <AppContainerQuintaDB />
  </div>
  // </React.StrictMode>
);
