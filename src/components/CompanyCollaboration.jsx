import caremetx from "@/assets/images/caremetx.png";
// import cisco from "@/assets/images/cisco.png";
// import relic from "@/assets/images/relic.png";
import rsystems from "@/assets/images/rsystems.png";
import fyndster from "@/assets/images/fyndster.png";

export default function CompanyCollaborations() {
  return (
    <div className="bg-zinc-950 py-4 md:py-12">
      <h1 className="uppercase tracking-wider text-center text-base md:text-2xl text-zinc-200 font-semibold  my-4 md:my-8">
        <span className="text-2xl md:text-3xl">💼</span> Companies Using Open
        Retro
      </h1>
      <div className="flex flex-wrap justify-center items-center gap-12 py-4">
        <img src={fyndster} alt="" className="w-28" />
        <img src={rsystems} alt="" className="w-28" />
        <img src={caremetx} alt="" className="w-28" />
        {/* <img src={cisco} alt="" className="h-24  mr-3" />
        <img src={relic} alt="" className="h-6 " /> */}
      </div>
    </div>
  );
}
