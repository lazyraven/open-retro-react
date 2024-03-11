import screenshot from "@/assets/images/screenshot.png";
export default function Retrospectives() {
  return (
    <div className="flex flex-col py-6 md:py-12">
      <div className="flex justify-center">
        <h2 className="text-center uppercase text-2xl py-5 font-semibold text-zinc-900 px-2">
          📷 Get a Preview
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-1 md:gap-5">
        <div className="col-span-1 md:col-span-2 flex justify-end py-5 md:px-3 z-20">
          <img
            src={screenshot}
            alt=""
            className="shadow-lg w-full rounded-lg md:rounded-3xl md:p-3 bg-zinc-900"
          />
        </div>
        <div className="col-span-1 px-3 flex items-center ">
          <div className="text-zinc-100 flex flex-col gap-4 leading-8 shadow-sm bg-blue-600 pr-5 pl-8 md:pl-12 py-8 rounded-2xl md:-translate-x-16">
            <h3 className="text-xl md:text-3xl font-medium">Retro Board</h3>
            <ul className="list-disc bullet-points">
              <li className="ml-5 !text-zinc-100">What worked well?</li>
              <li className="ml-5 !text-zinc-100">What didn't work well?</li>
              <li className="ml-5 !text-zinc-100">
                What actionable items can we do to improve the situation?
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
