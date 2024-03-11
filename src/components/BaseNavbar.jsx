import BaseIcon from "./BaseIcon";
import { ICONS } from "../helpers/constant";
import { Link } from "react-router-dom";
import OpenRetroBanner from "@/assets/images/OpenRetroBanner.png";

export default function BaseNavbar() {
  return (
    <div className="flex items-center gap-3 px-12 py-4 text-white bg-zinc-950">
      <Link to="/" className="flex gap-3 items-center">
        <img src={OpenRetroBanner} alt="" className="h-8" />
      </Link>
    </div>
  );
}
