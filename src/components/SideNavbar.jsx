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
    <div className="flex flex-col gap-y-12 py-4 text-zinc-200 bg-zinc-900 border-r border-zinc-800 min-h-screen shadow-lg">
      <div className="py-4 text-white w-full px-4">
        <Link to="/" className="">
          <img src={OpenRetroBanner} alt="" className="max-w-[10rem]" />
        </Link>
      </div>
      <ul className="flex flex-col gap-3  border-zinc-700 mb-4 overflow-auto">
        {tabs.map((tab, index) => (
          <li key={`tab-index-${index}`} className="flex px-4">
            <NavLink
              to={tab.to}
              className={({ isActive }) =>
                isActive
                  ? "px-4 w-full py-3 text-sm font-semibold text-blue-500 bg-zinc-800 rounded-md whitespace-nowrap sidebar-active-link"
                  : "px-4 w-full py-3 text-sm text-zinc-200 whitespace-nowrap font-semibold"
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
