import { createBrowserRouter } from "react-router-dom";

import HomePage from "./pages/home";
import OpenRetroId from "./pages/OpenRetroId";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/OpenRetroId",
    element: <OpenRetroId />,
  },
]);

export default router;
