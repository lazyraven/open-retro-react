import { useEffect, useState } from "react";
import { useParams, Outlet, Link } from "react-router-dom";
import { db } from "@/firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function BoardId() {
  const [board, setBoard] = useState({});
  const params = useParams();
  const navigate = useNavigate();

  console.log("params", params);

  useEffect(() => {
    // const boardRef = collection(db, "retros");
    // console.log(`params.boardId`);
    // console.log(params.boardId);
    // const q = query(boardRef, where("boardId", "==", params.boardId));
    // // const q = query(boardRef, where("boardId", "==", "HYHe9hVonGIwRxSGFjLm"));
    // return onSnapshot(q, (snapShot) => {
    //   let retroDetails = [];
    //   snapShot.docs.forEach((doc) => {
    //     retroDetails.push({ ...doc.data(), id: doc.id });
    //   });
    //   console.log("retroDetails", retroDetails);
    //   setBoard(retroDetails);
    // });
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
