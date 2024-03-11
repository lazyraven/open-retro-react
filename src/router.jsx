import { createBrowserRouter } from "react-router-dom";

import Root from "@/pages/root";
import Home from "@/pages/home";
import Retros from "@/pages/boards/boardId/retros/index";
import RetroId from "@/pages/boards/boardId/retros/retroId";
import BoardId from "@/pages/boards/boardId/index";
import Reports from "@/pages/boards/boardId/reports/index";
import ScrumPoker from "@/pages/boards/boardId/scrum-poker/index";
import Members from "@/pages/boards/boardId/members/index";

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
            path: "reports",
            element: <Reports></Reports>,
          },
          {
            path: "retros",
            element: <Retros />,
          },
          {
            path: "retros/:retroId",
            element: <RetroId />,
          },
          {
            path: "scrum-poker",
            element: <ScrumPoker></ScrumPoker>,
          },
          {
            path: "members",
            element: <Members />,
          },
        ],
      },
    ],
  },
]);

export default router;
