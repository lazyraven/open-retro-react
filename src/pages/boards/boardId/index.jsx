import { useEffect, useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import boardService from "@/services/board.service";
import { useParams } from "react-router-dom";
import BaseIcon from "@/components/BaseIcon";
import { ICONS } from "@/helpers/constant";

export default function BoardId() {
  const [board, setBoard] = useState({});
  const params = useParams();
  const tabs = [
    { name: "Retros", to: "retros" },
    { name: "Members", to: "members" },
    { name: "Reports", to: "reports" },
  ];

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
    <div className="flex flex-col gap-1 min-h-screen">
      <div className="flex justify-between mt-2 items-center py-1 gap-3">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl text-zinc-200">
            {board.boardName} • {board.createdBy}
          </h1>
          <h3 className="text-zinc-500 text-sm">{board.createdDate}</h3>
        </div>
        <div className="flex">
          <button
            type="button"
            onClick={(event) => {}}
            className="flex gap-1 items-center px-3 py-1 border border-zinc-500  text-zinc-500 rounded-md bg-zinc-900 shadow-2xl"
          >
            <BaseIcon
              iconName={ICONS.ArrowUpOnSquare}
              className="flex h-5 w-5 text-violet-600"
            ></BaseIcon>
            Share
          </button>
        </div>
      </div>
      <ul className="flex gap-3 border-b border-zinc-700 mb-4">
        {tabs.map((tab, index) => (
          <li key={`tab-index-${index}`} className="flex">
            <NavLink
              to={tab.to}
              className={({ isActive }) =>
                isActive
                  ? "px-4 py-4 text-sm font-medium text-violet-600 border-b border-violet-600"
                  : "px-4 py-4 text-sm text-slate-200 font-medium"
              }
            >
              {tab.name}
            </NavLink>
          </li>
        ))}
      </ul>
      {/* <Retros></Retros> */}
      <Outlet></Outlet>
    </div>
  );
}
