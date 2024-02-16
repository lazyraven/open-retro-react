import { useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";
import boardService from "@/services/board.service";
import { useParams } from "react-router-dom";

export default function BoardId() {
  const [board, setBoard] = useState({});
  const params = useParams();

  const getBoard = async () => {
    try {
      // { boardId: params.boardId }
      const boards = await boardService.getBoards();
      boards.forEach((board) => {
        if (board.id == params.boardId) {
          // const date = new Date(board.createdDate);
          // console.log(date);
          setBoard(board);
        }
      });
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getBoard();
  }, []);
  return (
    <div className="flex flex-col gap-5">
      <div className="px-3 pt-5 gap-3">
        <div className="text-xl">{board.boardName}</div>
        <div className="text-xl">{board.createdBy}</div>
        {/* <h1 className="text-xl">{new Date(board.createdDate)}</h1> */}
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
              to="reports"
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
