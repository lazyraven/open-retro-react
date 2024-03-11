import dashboardImage from "@/assets/images/dashboard.svg";
// import { Link } from "react-router-dom";
import CompanyCollaborations from "@/components/CompanyCollaboration";
import Retrospectives from "@/components/RetroSpective";
import About from "@/components/About";
import NewBoardModal from "@/page-components/boards/NewBoardModal";

function HomePage() {
  return (
    <>
      <div className="bg-zinc-950">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col lg:flex-row-reverse">
            <div className="w-full py-2">
              <div className="flex flex-col my-6 md:my-14">
                <h1 className="uppercase text-3xl md:text-5xl text-zinc-100 font-bold tracking-wider !leading-snug">
                  📋Free Retrospective
                </h1>
                <h1 className="uppercase text-3xl md:text-5xl text-zinc-100 font-bold tracking-wider !leading-snug">
                  & 🃏Scrum Poker
                </h1>
                <p className="text-lg mt-8 md:text-xl text-zinc-200">
                  Reflect and improve effortlessly with a user-friendly
                  interface. Perfect for all teams! 🚀
                </p>
              </div>
              <NewBoardModal></NewBoardModal>
            </div>
            <div className="w-full flex justify-center py-5">
              <div>
                <img
                  src={dashboardImage}
                  alt=""
                  className="max-h-[32rem] min-h-[28rem]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <CompanyCollaborations></CompanyCollaborations>
      <div className="bg-white">
        <div className="container mx-auto px-2 md:px-12">
          <Retrospectives></Retrospectives>
        </div>
      </div>

      <About></About>
    </>
  );
}
export default HomePage;
