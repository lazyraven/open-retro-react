import NewBoardModal from "@/page-components/boards/NewBoardModal";
import BaseIcon from "@/components/BaseIcon";
import { ICONS } from "@/helpers/constant";
import image from "@/assets/images/dashboard.svg";

import { Link } from "react-router-dom";

function HomePage() {
  return (
    <>
      <div className="bg-gradient-to-b from-slate-50 to-indigo-50 min-h-screen">
        <div className="flex  container ">
          <div className="w-1/2  px-44 py-2">
            <div className="flex flex-col gap-5 mb-14">
              <div className="flex flex-col gap-3 py-10">
                <span className="text-4xl font-sans font-bold text-gray-600">
                  Improve with
                </span>
                <span className="text-4xl font-sans font-bold text-gray-600">
                  Fun Sprint
                </span>
                <span className="text-4xl font-sans font-bold text-gray-600">
                  Retrospectives 🔥
                </span>
              </div>
              <p className="text-xl font-sans text-gray-600">
                Collaborate with your remote team and get better at what you do
                with a simple, intuitive and beautiful tool
              </p>
            </div>
            <Link className=" px-10 py-5 font-mono border text-white font-semibold  bg-blue-500 hover:bg-blue-600">
              Get Started for Free
            </Link>
          </div>
          <div className="w-1/2 flex justify-center">
            <div>
              <img src={image} alt="" className="h-[32rem]" />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#F1F2F5] px-8 py-8">
        <h1 className="text-2xl font-bold text-neutral-600">Dashboard</h1>
        <div className=" flex  py-4 ">
          <NewBoardModal>
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
              <h1 className="text-sm">Add boards</h1>
            </button>
          </NewBoardModal>
        </div>
      </div>
    </>
  );
}
export default HomePage;
