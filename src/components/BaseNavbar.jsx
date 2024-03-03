import BaseIcon from "./BaseIcon";
import { ICONS } from "../helpers/constant";
import { Link } from "react-router-dom";

export default function BaseNavbar() {
  return (
    <div className="flex items-center  gap-3 px-12 py-4 text-white bg-zinc-950">
      <Link to="/" className="flex gap-2 items-center">
        <BaseIcon
          iconName={ICONS.rocket}
          className=" flex w-6 h-6 text-violet-500"
        ></BaseIcon>

        <h1 className="text-lg">
          Open <b className=" text-gray-500">Retro</b>
        </h1>
      </Link>
    </div>
  );
}
