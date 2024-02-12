import { useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";

export default function BoardId() {
  const [board, setBoard] = useState({});

  useEffect(() => {
    setBoard(`hey`);
  }, []);
  return (
    <div className="flex flex-col gap-5">
      <div className="px-3 pt-5">
        <h1 className="text-xl">{board.boardName}Hello' Lakshya</h1>
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
        </ul>
      </div>
      <Outlet></Outlet>
    </div>
  );
}
