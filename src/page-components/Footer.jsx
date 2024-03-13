import BaseIcon from "@/components/BaseIcon";
import { ICONS } from "@/helpers/constant";
import { version } from "../../package.json";

export default function Footer() {
  return (
    <div className="container mx-auto px-2 md:px-12">
      <div className="flex flex-col gap-y-2">
        <div className="flex flex-col gap-2 py-8 px-4 bg-zinc-900">
          <div className="flex">
            <h2 className="text-zinc-300 text-xl">Contact Us</h2>
          </div>
          <div className="flex gap-2 mt-3">
            <BaseIcon
              iconName={ICONS.Map}
              className=" flex h-6 w-6 text-zinc-100"
            ></BaseIcon>
            <p className="text-white">Royal Garden Estate, Noida, India </p>
          </div>
          <div className="flex gap-2 mt-3">
            <BaseIcon
              iconName={ICONS.Phone}
              className="flex h-6 w-6 text-zinc-100"
            ></BaseIcon>
            <p className="text-white">+919929209856</p>
          </div>
          <div className="flex gap-2 mt-3">
            <BaseIcon
              iconName={ICONS.Envelope}
              className="flex h-6 w-6 text-zinc-100"
            ></BaseIcon>
            <p className="text-white">care@openretro.in</p>
          </div>
        </div>
      </div>

      <div className="flex justify-center py-2">
        <span className="text-zinc-300 p-2"> (v{version}) </span>
      </div>
    </div>
  );
}
