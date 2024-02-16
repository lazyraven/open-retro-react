import BaseIcon from "./BaseIcon";
import { ICONS } from "../helpers/constant";
import { Link } from "react-router-dom";

export default function BaseNavbar() {
  return (
    <div className="flex items-center bg-zinc-100 gap-3 px-5 py-4">
      <Link to="/" className="flex gap-2 items-center">
        <BaseIcon
          iconName={ICONS.rocket}
          className=" flex w-6 h-6 text-blue-500"
        ></BaseIcon>

        <h1 className="text-xl">
          Open <b className=" text-gray-500">Retro</b>
        </h1>
      </Link>
    </div>
  );
}
