import { createBrowserRouter } from "react-router-dom";

import Root from "@/pages/root";
import Home from "@/pages/home";
import RetroId from "@/pages/boards/boardId/retros/retroId";
import BoardId from "@/pages/boards/boardId/index";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/boards/:boardId",
        element: <BoardId />,
        children: [
          {
            path: ":retroId",
            element: <RetroId />,
          },
        ],
      },
    ],
  },

  // {
  //   path: "/:OpenRetroId",
  //   element: <OpenRetroId />,
  // },
  // {
  //   path: "/boards/:boardId",
  //   element: <OpenRetros />,
  // },
  // {
]);

export default router;
