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
    <div className="flex flex-col">
      <div className="flex gap-3">
        <h1>{board.boardName}</h1>visal
      </div>
      <div className="flex">
        <ul className="flex gap-3">
          <li>
            <Link to="retros" className="p-2">
              Retros
            </Link>
          </li>
          <li>
            <Link to="members">Members</Link>
          </li>
        </ul>
      </div>
      <Outlet></Outlet>
    </div>
  );
}
