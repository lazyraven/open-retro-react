import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BaseIcon from "../components/BaseIcon";
import { ICONS } from "../helpers/constant";
import BaseNavbar from "./BaseNavbar";
import boardService from "@/services/board.service";

export default function OpenRetros() {
  const [retros, setRetros] = useState([]);
  const params = useParams();
  console.log("params", params);
  console.log("retros", retros);

  const getRetrosDetail = async () => {
    try {
      const retros = await boardService.getRetros();
      setRetros(retros);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getRetrosDetail();
  }, []);
  const retroClick = (path) => {
    console.log("retroClick called", path);
  };

  return (
    <div>
      <BaseNavbar></BaseNavbar>

      <div className="bg-[#F1F2F5] px-8 py-8">
        <div className=" flex py-4 gap-4">
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
            <h1 className="text-sm">Create boards</h1>
          </button>
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
                    retroClick(retroDetails.path);
                  }}
                >
                  <div className="divide-y divide-zinc-300">
                    <div>
                      <h1 className="text-md text-left text-slate-600">
                        <strong>{retroDetails.retroName}</strong>
                      </h1>
                      <div className="flex text-xs text-zinc-500 py-2 gap-2">
                        <div>{retroDetails.retroName}</div>
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
          <button
            type="button"
            className="border-2 border-neutral-300 border-solid h-60 w-60 flex flex-col gap-1 rounded-md p-2 bg-white"
          >
            <div className="divide-y divide-zinc-300">
              <div>
                <h1 className="text-md text-left text-slate-600">
                  <strong>Sprint boards</strong>
                </h1>
                <div className="flex text-xs text-zinc-500 py-2 gap-2">
                  <div>31 Oct 2023</div>
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
      </div>
    </div>
  );
}
