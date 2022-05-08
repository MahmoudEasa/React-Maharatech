import React from "react";
import createRoot from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "../node_modules/@fortawesome/fontawesome-free/css/all.css";
import "react-toastify/dist/ReactToastify.css";

import App from "./components/app";

const root = createRoot.createRoot(document.querySelector("#root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
