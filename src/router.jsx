import { createBrowserRouter } from "react-router-dom";

import Home from "./pages/home";
import OpenRetroId from "./pages/OpenRetroId";
import OpenRetros from "./pages/OpenRetros";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/OpenRetroId",
    element: <OpenRetroId />,
  },
  {
    path: "/:boardId",
    element: <OpenRetros />,
  },
]);

export default router;
