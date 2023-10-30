import { createBrowserRouter } from "react-router-dom";

import Home from "./pages/home";
import OpenRetroId from "./pages/OpenRetroId";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/OpenRetroId",
    element: <OpenRetroId />,
  },
]);

export default router;
