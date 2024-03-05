import intercom from "@/assets/images/intercom.png";
import cisco from "@/assets/images/cisco.png";
import relic from "@/assets/images/relic.png";
import nvidia from "@/assets/images/nvidia.png";
import fyndster from "@/assets/images/fyndster.png";

export default function CompanyCollaborations() {
  return (
    <div className="bg-gradient-to-b from-zinc-900 to-zinc-400">
      <div className="py-10">
        <h1 className="text-center text-[1.8rem] font-semibold text-slate-300">
          Thousands of teams across 100+ countries trust OpenRetro
        </h1>
        <div className="flex justify-center items-center gap-3 py-4">
          <img src="" alt="" className="h-10" />
          <img src={intercom} alt="" className="h-32" />
          <img src={cisco} alt="" className="h-24 mr-3" />
          <img src={relic} alt="" className="h-6" />
          <img src={fyndster} alt="" className="h-28" />
          <img src={nvidia} alt="" className="h-28" />
        </div>
      </div>
    </div>
  );
}
