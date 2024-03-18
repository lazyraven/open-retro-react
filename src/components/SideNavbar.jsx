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
    <div className="flex flex-col md:gap-y-12 md:py-4 text-zinc-200 bg-zinc-900 border-r border-zinc-800 md:min-h-screen shadow-lg md:fixed left-0 top-0 bottom-0">
      <div className="py-4 text-white w-full px-4">
        <Link to="/" className="">
          <img src={OpenRetroBanner} alt="" className="max-w-[10rem]" />
        </Link>
      </div>
      <ul className="flex flex-row md:flex-col gap-3  border-zinc-700 md:mb-4 overflow-auto">
        {tabs.map((tab, index) => (
          <li key={`tab-index-${index}`} className="flex md:px-4">
            <NavLink
              to={tab.to}
              className={({ isActive }) =>
                isActive
                  ? "px-4 w-full py-3 text-sm font-semibold text-blue-500 md:bg-zinc-800 rounded-md whitespace-nowrap sidebar-active-link"
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
