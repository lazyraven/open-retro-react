import image from "@/assets/images/dashboard.svg";
// import { Link } from "react-router-dom";
import CompanyCollaborations from "@/components/CompanyCollaboration";
import Retrospectives from "@/components/RetroSpective";
import About from "@/components/About";
import NewBoardModal from "@/page-components/boards/NewBoardModal";
import BaseIcon from "@/components/BaseIcon";
import { ICONS } from "@/helpers/constant";

function HomePage() {
  return (
    <>
      <div className="bg-slate-900">
        <div className="flex  container m-auto ">
          <div className="w-1/2 px-44 py-2">
            <div className="flex flex-col gap-3 mb-14 pt-10">
              <div className="flex flex-col py-5 text-slate-200">
                <span className="text-[2.5rem] font-sans font-bold">
                  Improve with
                </span>
                <span className="text-[2.5rem] font-sans font-bold">
                  Fun Sprint
                </span>
                <span className="text-[2.5rem] font-sans font-bold">
                  Retrospectives
                </span>
              </div>
              <p className="text-xl font-sans text-gray-400">
                Collaborate with your remote team and get better at what you do
                with a simple, intuitive and beautiful tool
              </p>
            </div>

            <NewBoardModal>
              <button className="flex gap-3 px-8 py-3 items-center font-mono border text-white font-semibold bg-transparent hover:bg-[#383a3a]">
                <div className="">Create Board</div>
                <BaseIcon
                  iconName={ICONS.Plus}
                  className=" flex h-4 w-4 text-white"
                ></BaseIcon>
              </button>
            </NewBoardModal>
          </div>
          <div className="w-1/2 flex justify-center py-5">
            <div>
              <img src={image} alt="" className="h-[32rem]" />
            </div>
          </div>
        </div>
        <CompanyCollaborations></CompanyCollaborations>
        <Retrospectives></Retrospectives>
        <About></About>
      </div>
    </>
  );
}
export default HomePage;
