import screenshot from "@/assets/images/screenshot.png";
import ScrumPokerPng from "@/assets/images/scrum-poker.png";

export default function GetAPreview() {
  return (
    <div className="flex flex-col py-6 lg:py-12">
      <div className="flex justify-center">
        <h2 className="text-center uppercase text-2xl py-5 font-semibold text-zinc-900 px-2">
          📷 Get a Preview
        </h2>
      </div>

      <div className="flex flex-col lg:flex-row gap-1 lg:gap-5 items-center justify-center">
        <div className="basis-2/3 flex justify-center items-center py-5 lg:px-3 z-20">
          <img
            src={screenshot}
            alt=""
            className="shadow-lg w-full rounded-lg lg:rounded-3xl lg:p-3 bg-zinc-900"
          />
        </div>
        <div className="basis-1/3 px-5 flex items-center justify-center">
          <div className="text-zinc-100 flex flex-col gap-4 leading-8 shadow-sm rounded-lg bg-zinc-50 pr-5 pl-6 lg:pl-10 pt-8 pb-4 lg:pb-8 -translate-y-10 lg:translate-y-0 lg:-translate-x-16">
            <h3 className="text-xl lg:text-3xl text-zinc-800 font-semibold">
              Retro Board 📋
            </h3>
            <ul className="list-disc bullet-points">
              <li className="ml-5 !text-zinc-800">What worked well?</li>
              <li className="ml-5 !text-zinc-800">What didn't work well?</li>
              <li className="ml-5 !text-zinc-800">
                What actionable items can we do to improve the situation?
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row-reverse gap-1 lg:gap-5 items-center justify-center">
        <div className="basis-2/3 flex justify-center items-center py-5 lg:px-3 z-20">
          <img
            src={ScrumPokerPng}
            alt=""
            className="shadow-lg w-full rounded-lg lg:rounded-3xl lg:p-3 bg-zinc-900"
          />
        </div>
        <div className="basis-1/3 px-5 flex items-center justify-center">
          <div className="text-zinc-100 flex flex-col gap-4 leading-8 shadow-sm rounded-lg bg-zinc-50 pl-5 pr-6 lg:pr-10 pt-8 pb-4 lg:pb-8 -translate-y-10 lg:translate-y-0 lg:translate-x-20">
            <h3 className="text-xl lg:text-3xl text-zinc-800 font-semibold">
              Scrum Poker 🃏
            </h3>
            <ul className="list-disc bullet-points">
              <li className="ml-5 !text-zinc-800">Consensus Building</li>
              <li className="ml-5 !text-zinc-800">
                Voting with Fibonacci Sequence
              </li>
              <li className="ml-5 !text-zinc-800">Improves story sizing</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
