import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BaseIcon from "@/components/BaseIcon";
import { ICONS } from "@/helpers/constant";
import NewRetroModal from "@/page-components/retros/NewRetroModal";
import { useNavigate } from "react-router-dom";
import boardService from "@/services/board.service";

export default function Retros() {
  const [retros, setRetros] = useState([]);
  const params = useParams();
  const navigate = useNavigate();

  const getBoardRetros = async () => {
    try {
      const boardRetros = await boardService.getBoardRetros({
        boardId: params.boardId,
      });
      if (boardRetros && boardRetros.length) {
        setRetros(boardRetros);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getBoardRetros();
  }, []);

  const retroClick = (retroDetail) => {
    navigate(`/boards/${params.boardId}/retros/${retroDetail.id}`);
  };

  return (
    <>
      <div className=" flex gap-8 flex-wrap items-center py-4">
        <NewRetroModal getBoardRetros={getBoardRetros}>
          <button
            type="button"
            className="flex flex-col gap-y-2 justify-center items-center bg-zinc-900 hover:bg-zinc-800 border-2 border-zinc-700 border-dashed h-40 w-60 rounded-md"
          >
            <div className="bg-zinc-950 rounded-full p-4">
              <BaseIcon
                iconName={ICONS.Plus}
                className=" flex h-6 w-6 text-white"
              ></BaseIcon>
            </div>
            <h1 className="text-sm text-white">New Retro</h1>
          </button>
        </NewRetroModal>

        {retros.map((retroDetails, index) => {
          return (
            <div key={retroDetails.retroName + index}>
              <div
                type="button"
                className="border-solid min-h-60 w-60 flex flex-col gap-1 rounded-md px-2 py-2 bg-zinc-800 hover:bg-zinc-700"
              >
                <div className="m-auto">
                  <div>
                    <h1 className="text-md text-left capitalize text-zinc-300">
                      <strong>{retroDetails.retroName}</strong>
                    </h1>
                    <div className="flex text-xs text-zinc-400 py-2 gap-2">
                      <div> {retroDetails.createdDate}</div>
                      <div className="text-right">3 cards</div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      retroClick(retroDetails);
                    }}
                  >
                    <div className="flex h-32 py-3 gap-4">
                      <div className="bg-teal-600 text-white w-14"></div>
                      <div className="bg-pink-600 text-white w-14"></div>
                      <div className="bg-fuchsia-600 text-white w-14"></div>
                    </div>
                  </button>
                  <div className="flex justify-between items-center">
                    <h6 className="text-zinc-400 text-sm font-semibold py-2 text-left">
                      Share
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
