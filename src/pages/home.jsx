import image from "@/assets/images/dashboard.svg";
import { Link } from "react-router-dom";
import CompanyCollaborations from "@/components/CompanyCollaboration";
import Retrospectives from "@/components/RetroSpective";
import About from "@/components/About";

function HomePage() {
  return (
    <>
      <div className="">
        <div className="flex  container bg-gradient-to-b from-slate-50 to-indigo-50 ">
          <div className="w-1/2 px-44 py-2">
            <div className="flex flex-col gap-3 mb-14 pt-10">
              <div className="flex flex-col py-5 text-[#334357]">
                <span className="text-[2.5rem] font-sans font-bold">
                  Improve with
                </span>
                <span className="text-[2.5rem] font-sans font-bold">
                  Fun Sprint
                </span>
                <span className="text-[2.5rem] font-sans font-bold">
                  Retrospectives 🔥
                </span>
              </div>
              <p className="text-xl font-sans text-gray-600">
                Collaborate with your remote team and get better at what you do
                with a simple, intuitive and beautiful tool
              </p>
            </div>
            <Link
              to="/board"
              className=" px-10 py-5 font-mono border text-white font-semibold bg-blue-500 hover:bg-blue-600 shadow-lg"
            >
              Create Board
            </Link>
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
