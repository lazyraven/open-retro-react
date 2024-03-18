import { Link, NavLink } from "react-router-dom";
import OpenRetroBanner from "@/assets/images/OpenRetroBanner.png";
export default function SideNavbar() {
  const tabs = [
    { name: "Retros", to: "retros" },
    { name: "Scrum Poker", to: "scrum-poker" },
    { name: "Reports", to: "reports" },
    { name: "Members", to: "members" },
  ];
  return (
    <div className="flex flex-col gap-y-12 text-zinc-200">
      <div className="py-2 text-white w-full">
        <Link to="/" className="">
          <img src={OpenRetroBanner} alt="" className="" />
        </Link>
      </div>
      <ul className="flex flex-col gap-3  border-zinc-700 mb-4 overflow-auto">
        {tabs.map((tab, index) => (
          <li key={`tab-index-${index}`} className="flex">
            <NavLink
              to={tab.to}
              className={({ isActive }) =>
                isActive
                  ? "px-4 w-full py-2 text-sm font-medium text-zinc-200 bg-zinc-800 rounded-md whitespace-nowrap"
                  : "px-4 w-full py-4 text-sm text-zinc-200 whitespace-nowrap font-medium"
              }
            >
              {tab.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
