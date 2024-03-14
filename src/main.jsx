import ReactDOM from "react-dom/client";
import router from "./router.jsx";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import ReactGA from "react-ga4";
import BoardProvider from "@/contexts/BoardProvider";

const { VITE_FIRBASE_MEASUREMENT_ID } = import.meta.env;
console.log("VITE_FIRBASE_MEASUREMENT_ID", VITE_FIRBASE_MEASUREMENT_ID);
ReactGA.initialize(VITE_FIRBASE_MEASUREMENT_ID);

ReactGA.send({
  hitType: "pageview",
  page: window.location.pathname,
});

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <BoardProvider>
    <RouterProvider router={router} />
  </BoardProvider>
  // </React.StrictMode>
);
