import React from "react";
import ReactDOM from "react-dom/client";
import router from "./router.jsx";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import ReactGA from "react-ga";

const TRACKING_ID = "UA-281986007-1";
ReactGA.initialize(TRACKING_ID);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
