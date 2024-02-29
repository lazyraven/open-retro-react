import { useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";
import boardService from "@/services/board.service";
import { useParams } from "react-router-dom";
// import Retros from "./retros/index";

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
    <div className="flex flex-col gap-6 min-h-screen">
      <div className="flex justify-between mt-2 items-center py-1  gap-3">
        <div className="flex flex-col py-2 bg-[#121212] rounded-sm">
          <h1 className="text-2xl text-slate-200">{board.boardName}</h1>
          {/* <h1 className="text-sm ">{formattedDate}</h1> */}
        </div>
        <div className="flex gap-2 items-center py-2 bg-[#121212] rounded-sm">
          <span className="text-sm text-slate-200">Created By :</span>
          <h1 className="text-lg font-medium text-slate-200">
            {board.createdBy}
          </h1>
        </div>
        <div className="px-4 py-2 bg-[#121212] rounded-sm">
          <span className="text-sm text-slate-200">created date :</span>
          <h1 className="text-lg font-medium text-slate-200">
            {board.createdDate}
          </h1>
        </div>
      </div>
      <div className="flex">
        <ul className="flex gap-3">
          <li>
            <Link
              to="retros"
              className="px-3 py-2 text-sm  rounded-md text-slate-200 bg-neutral-800 hover:bg-[#181818] font-medium"
            >
              Retros
            </Link>
          </li>
          <li>
            <Link
              to="members"
              className="px-3 py-2 text-sm  rounded-md text-slate-200 bg-neutral-800 hover:bg-[#181818] font-medium"
            >
              Members
            </Link>
          </li>
          <li>
            <Link
              to="reports"
              className="px-3 py-2 text-sm  rounded-md text-slate-200 bg-neutral-800 hover:bg-[#181818] font-medium"
            >
              Reports
            </Link>
          </li>
        </ul>
      </div>
      {/* <Retros></Retros> */}
      <Outlet></Outlet>
    </div>
  );
}
