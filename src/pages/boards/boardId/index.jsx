import { useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";
import boardService from "@/services/board.service";
import { useParams } from "react-router-dom";

export default function BoardId() {
  const [board, setBoard] = useState({});
  const params = useParams();

  const getBoardRecord = async () => {
    try {
      const board = await boardService.getBoard({ boardId: params.boardId });
      console.log(board, "board");
      if (board && board.id) {
        setBoard(board);
      }
    } catch (e) {
      console.log(e);
    }
  };

  // const nanoseconds = board.createdDate.nanoseconds;
  // const seconds = board.createdDate.seconds;
  // const milliseconds = seconds * 1000 + Math.floor(nanoseconds / 1000000);
  // const date = new Date(milliseconds);
  // const formattedDate = date.toDateString();

  useEffect(() => {
    getBoardRecord();
  }, []);
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between mt-2 items-center py-1 px-3 gap-3">
        <div className="flex flex-col">
          <h1 className="text-2xl">{board.boardName}</h1>
          {/* <h1 className="text-sm ">{formattedDate}</h1> */}
        </div>
        <div>
          <span className="text-sm text-gray-500">created by :</span>
          <h1 className="text-lg font-medium text-gray-500">
            {board.createdBy}
          </h1>
        </div>
        <div>
          <span className="text-sm text-gray-500">created date :</span>
          <h1 className="text-lg font-medium text-gray-500">
            {board.createdDate}
          </h1>
        </div>
      </div>
      <div className="flex px-3">
        <ul className="flex gap-3">
          <li>
            <Link
              to="retros"
              className="px-2 py-1 text-sm border rounded-md bg-[#F1F2F5] hover:bg-slate-200 font-medium"
            >
              Retros
            </Link>
          </li>
          <li>
            <Link
              to="members"
              className="px-2 py-1 text-sm border rounded-md bg-[#F1F2F5] hover:bg-slate-200 font-medium"
            >
              Members
            </Link>
          </li>
          <li>
            <Link
              to="reports"
              className="px-2 py-1 text-sm border rounded-md bg-[#F1F2F5] hover:bg-slate-200 font-medium"
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
