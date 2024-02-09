import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BaseIcon from "@/components/BaseIcon";
import { ICONS } from "@/helpers/constant";
import BaseNavbar from "@/components/BaseNavbar";
// import boardService from "@/services/board.service";
import NewRetroModal from "@/page-components/retros/NewRetroModal";
import { db } from "@/firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function BoradId() {
  const [retros, setRetros] = useState([]);
  const params = useParams();
  const navigate = useNavigate();

  console.log("params", params);

  useEffect(() => {
    const boardRef = collection(db, "retros");
    console.log(`params.boardId`);
    console.log(params.boardId);

    const q = query(boardRef, where("boardId", "==", params.boardId));
    // const q = query(boardRef, where("boardId", "==", "HYHe9hVonGIwRxSGFjLm"));

    return onSnapshot(q, (snapShot) => {
      let retroDetails = [];
      snapShot.docs.forEach((doc) => {
        retroDetails.push({ ...doc.data(), id: doc.id });
      });
      console.log("retroDetails", retroDetails);
      setRetros(retroDetails);
    });
  }, []);
  const retroClick = (retroDetail) => {
    navigate(`/${retroDetail.boardId}/${retroDetail.id}`);
  };

  return (
    <div>
      <div className="bg-[#F1F2F5] px-8 py-8">
        <div className=" flex py-4 gap-4">
          <NewRetroModal>
            <button
              type="button"
              className="border-2 border-neutral-600 hover:border-blue-500 hover:text-blue-500 border-dashed h-40 w-60 flex flex-col gap-1 justify-center items-center rounded-md"
            >
              <div className=" bg-[#C0C0D4] rounded-full px-2 py-2">
                <BaseIcon
                  iconName={ICONS.Plus}
                  className=" flex h-6 w-6 text-white"
                ></BaseIcon>
              </div>
              <h1 className="text-sm">New Retro</h1>
            </button>
          </NewRetroModal>

          {retros.map((retroDetails, index) => {
            return (
              //   <h1 key={retroDetails.retroName + index}>
              //     {retroDetails.retroName}
              //     <span>abc</span>
              //   </h1>
              <div key={retroDetails.retroName + index}>
                <button
                  type="button"
                  className="border-2 border-neutral-300 border-solid h-60 w-60 flex flex-col gap-1 rounded-md p-2 bg-white"
                  onClick={() => {
                    retroClick(retroDetails);
                  }}
                >
                  <div className="divide-y divide-zinc-300">
                    <div>
                      <h1 className="text-md text-left text-slate-600">
                        <strong>{retroDetails.retroName}</strong>
                      </h1>
                      <div className="flex text-xs text-zinc-500 py-2 gap-2">
                        <div>
                          {" "}
                          {new Date("2020-12-28").toLocaleString("en-us", {
                            month: "short",
                            year: "numeric",
                          })}
                        </div>
                        <div className="text-right">3 cards</div>
                      </div>
                    </div>

                    <div className="flex h-32 py-3 gap-4">
                      <div className="bg-teal-700 text-white w-14"></div>
                      <div className="bg-rose-700 text-white w-14"></div>
                      <div className="bg-fuchsia-700 text-white w-14"></div>
                    </div>
                    <h6 className="text-zinc-400 text-sm font-semibold py-2 text-left">
                      Share
                    </h6>
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
