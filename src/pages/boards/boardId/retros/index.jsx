import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BaseIcon from "@/components/BaseIcon";
import { ICONS } from "@/helpers/constant";
import NewRetroModal from "@/page-components/retros/NewRetroModal";
import { useNavigate } from "react-router-dom";
import boardService from "@/services/board.service";
import { db } from "@/firebase";
import { deleteDoc, doc } from "firebase/firestore";

export default function Retros() {
  const [retros, setRetros] = useState([]);
  const params = useParams();
  const navigate = useNavigate();

  const getRetroDetails = async () => {
    try {
      const retroDetails = await boardService.getRetrosDetail({
        boardId: params.boardId,
      });
      console.log("retroDetails", retroDetails);
      setRetros(retroDetails);
    } catch (e) {
      console.log(e);
    }
    // getRetroDetails();
  };

  useEffect(() => {
    getRetroDetails();
  }, []);

  const retroClick = (retroDetail) => {
    navigate(`/boards/${retroDetail.boardId}/${retroDetail.id}`);
  };

  const deleteRetro = async (e, id) => {
    // console.log("deleteRetro", id);
    e.preventDefault();
    try {
      // await boardService.deleteRetro({ retroId: id });
      await deleteDoc(doc(db, "retros", id));
      getRetroDetails();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <div className="bg-[#F1F2F5] px-8 py-8">
        <div className=" flex gap-8 flex-wrap items-center py-4">
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
                <div
                  type="button"
                  className="border-2 border-neutral-300 border-solid h-60 w-60 flex flex-col gap-1 rounded-md px-2 py-2 bg-white"
                >
                  <div className="divide-y divide-zinc-300 m-auto">
                    <div>
                      <h1 className="text-md text-left capitalize text-slate-600">
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

                    <button
                      onClick={() => {
                        retroClick(retroDetails);
                      }}
                    >
                      <div className="flex h-32 py-3 gap-4">
                        <div className="bg-teal-700 text-white w-14"></div>
                        <div className="bg-rose-700 text-white w-14"></div>
                        <div className="bg-fuchsia-700 text-white w-14"></div>
                      </div>
                    </button>
                    <div className="flex justify-between items-center">
                      <h6 className="text-zinc-400 text-sm font-semibold py-2 text-left">
                        Share
                      </h6>
                      <button
                        type="button"
                        onClick={(event) => {
                          deleteRetro(event, retroDetails.id);
                        }}
                        className="  text-red-500 hover:text-red-800 rounded-sm"
                      >
                        <BaseIcon
                          className="flex h-4 w-4"
                          iconName={ICONS.Delete}
                        ></BaseIcon>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
