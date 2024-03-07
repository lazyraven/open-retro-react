import BaseIcon from "./BaseIcon";
import { ICONS } from "../helpers/constant";
import { Link } from "react-router-dom";

export default function BaseNavbar() {
  return (
    <div className="flex items-center gap-3 px-12 py-4 text-white bg-zinc-950">
      <Link to="/" className="flex gap-3 items-center">
        <BaseIcon
          iconName={ICONS.rocket}
          className=" flex w-8 h-8 text-indigo-500"
        ></BaseIcon>

        <h1 className="text-xl font-medium">
          Open <span className=" text-zinc-400">Retro</span>
        </h1>
      </Link>
    </div>
  );
}
