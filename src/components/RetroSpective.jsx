import screenshot from "@/assets/images/screenshot.png";
export default function Retrospectives() {
  return (
    <div className="mt-6 mb-8">
      <h1 className="text-center text-[2.5rem] py-5 font-semibold text-zinc-200">
        What Is A Fun Retrospective?
      </h1>
      <div className="flex flex-col lg:flex-row gap-5 lg:px-40">
        <div className="lg:w-1/2 flex justify-end py-5 px-3">
          <img
            src={screenshot}
            alt=""
            className="h-80  lg:w-[36rem] sm:w-full rounded-lg img"
          />
        </div>
        <div className=" lg:w-1/2 px-3">
          <div className="text-zinc-400 flex flex-col gap-4 leading-8">
            <h3 className="text-lg pt-4 ">
              A retrospective is an opportunity to learn and improve, in a fun
              environment. To break it down in the simplest way you should
              cover:
            </h3>
            <ul className="list-disc bullet-points">
              <li className="ml-5">What worked well?</li>
              <li className="ml-5">What didn't work well?</li>
              <li className="ml-5">
                What actionable items can we do to improve the situation?
              </li>
            </ul>
            <h3 className="text-lg ">
              These are generally quick sessions that are not only informative
              and contribute to the team's functionality and efficiency, but
              also do something most ‘Retrospectives’ forget to do: Engage the
              team.
            </h3>
            <h3 className="text-lg ">
              Our OpenRetro tool ensures you maintain high team morale by making
              these team collaboration opportunities effortless and fun.
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}
