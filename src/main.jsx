import React from "react";
import ReactDOM from "react-dom/client";
import router from "./router.jsx";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import ReactGA from "react-ga4";

const TRACKING_ID = "UA-281986007-1";
ReactGA.initialize(TRACKING_ID);

ReactGA.send({
  hitType: "pageview",
  page: window.location.pathname,
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
