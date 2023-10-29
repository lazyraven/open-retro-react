import BaseIcon from "../components/BaseIcon";
import { ICONS } from "../helpers/constant";

export default function BaseNavbar() {
  return (
    <div className="flex items-center gap-3 px-5 py-4">
      <BaseIcon
        iconName={ICONS.rocket}
        className=" flex w-6 h-6 text-blue-500"
      ></BaseIcon>

      <h1 className="text-xl">
        Open <b className=" text-gray-500">Retro</b>
      </h1>
    </div>
  );
}
