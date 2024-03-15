import dashboardImage from "@/assets/images/dashboard.svg";
import CompanyCollaborations from "@/components/CompanyCollaboration";
import GetAPreview from "@/components/GetAPreview";
import CreateBoardModal from "@/page-components/boards/CreateBoardModal";
import Footer from "@/page-components/Footer";

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
              <CreateBoardModal></CreateBoardModal>
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

      <div className=" bg-gradient-to-b from-blue-500 bg-pink-600 backdrop-blur-3xl relative overflow-hidden">
        <div className="relative z-10 backdrop-blur-2xl bg-white/50">
          <div className="container mx-auto px-2 md:px-12">
            <GetAPreview></GetAPreview>
          </div>
        </div>
        <div className="absolute inset-0 blur-2xl bg-gradient-to-r from-yellow-500 from-20% via-pink-500 via-30% to-blue-500 to-80% rounded-full"></div>
      </div>

      <Footer></Footer>
    </>
  );
}
export default HomePage;
