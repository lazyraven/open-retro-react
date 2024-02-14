import { useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";
import boardService from "@/services/board.service";
import { useParams } from "react-router-dom";

export default function BoardId() {
  const [board, setBoard] = useState({});
  const params = useParams();
  console.log("params", params);

  const getBoard = async () => {
    try {
      const board = await boardService.getBoards({
        boardId: params.boardId,
      });
      console.log(board);
      setBoard(board);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    // setBoard(`hey`);
    getBoard({ boardId: params.boardId });
  }, {});
  return (
    <div className="flex flex-col gap-5">
      <div className="px-3 pt-5">
        <h1 className="text-xl">{board.boardName}Hello&#39; Lakshya</h1>
      </div>
      <div className="flex px-3">
        <ul className="flex gap-3">
          <li>
            <Link
              to="retros"
              className="px-3 py-2 border rounded-md bg-[#F1F2F5] hover:bg-slate-200 font-semibold"
            >
              Retros
            </Link>
          </li>
          <li>
            <Link
              to="members"
              className="px-3 py-2 border rounded-md bg-[#F1F2F5] hover:bg-slate-200 font-semibold"
            >
              Members
            </Link>
          </li>
          <li>
            <Link
              to="members"
              className="px-3 py-2 border rounded-md bg-[#F1F2F5] hover:bg-slate-200 font-semibold"
            >
              Reports
            </Link>
          </li>
        </ul>
      </div>
      <Outlet></Outlet>
    </div>
  );
}
