import ReactDOM from "react-dom/client";
import router from "./router.jsx";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import ReactGA from "react-ga4";
import BoardProvider from "@/contexts/BoardProvider";

const TRACKING_ID = "G-G8XKH37LMH";
ReactGA.initialize(TRACKING_ID);

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
