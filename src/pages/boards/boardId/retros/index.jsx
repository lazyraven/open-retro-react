import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import BaseIcon from "@/components/BaseIcon";
import { ICONS } from "@/helpers/constant";
import NewRetroModal from "@/page-components/retros/NewRetroModal";
import { useNavigate } from "react-router-dom";
import retroService from "@/services/retro.service";
import { parseDateTime } from "@/utils/common.util";

export default function Retros() {
  const [retros, setRetros] = useState([]);
  const params = useParams();
  const navigate = useNavigate();

  const getBoardRetros = async () => {
    try {
      const boardRetros = await retroService.getBoardRetros({
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

  return (
    <div className="grid grid-cols-2 py-3 items-center justify-center md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-x-4 gap-y-4 md:gap-y-8 flex-wrap">
      <NewRetroModal getBoardRetros={getBoardRetros} className="col-span-1">
        <button
          type="button"
          className="flex flex-col gap-y-2 justify-center items-center bg-zinc-900 hover:bg-zinc-800 border-2 border-zinc-700 border-dashed h-40 w-full max-w-xs mx-auto rounded-md"
        >
          <div className="bg-zinc-100 rounded-full p-4">
            <BaseIcon
              iconName={ICONS.Plus}
              className=" flex h-6 w-6 text-zinc-800"
            ></BaseIcon>
          </div>
          <h1 className="text-sm text-zinc-100 font-semibold">New Retro</h1>
        </button>
      </NewRetroModal>

      {retros.map((retro, index) => {
        return (
          <div
            key={retro.retroName + index}
            className="col-span-1 grid gap-3 content-between rounded-md bg-zinc-800 hover:bg-zinc-700 px-4 py-3 w-full h-full"
          >
            <div className="flex flex-col">
              <h5 className="text-md font-semibold text-left text-zinc-200">
                {retro.retroName}
              </h5>
              <div className="flex text-xs text-zinc-400 gap-2">
                <h6>{parseDateTime(retro.createdDate)}</h6>
              </div>
            </div>

            <Link
              to={`/boards/${params.boardId}/retros/${retro.id}`}
              className="flex justify-center gap-2 lg:gap-3"
            >
              <div className="basis-1/3 bg-teal-600 text-white h-16 md:h-24 lg:h-28"></div>
              <div className="basis-1/3 bg-pink-600 text-white h-16 md:h-24 lg:h-28"></div>
              <div className="basis-1/3 bg-fuchsia-600 text-white h-16 md:h-24 lg:h-28"></div>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
