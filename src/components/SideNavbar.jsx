import { Link, NavLink } from "react-router-dom";
import OpenRetroBanner from "@/assets/images/OpenRetroBanner.png";
import TimerSlide from "@/components/TimerSlide";
import ShareBoardModal from "@/page-components/boards/ShareBoardModal";

export default function SideNavbar({ board }) {
  const boardRetroUrl = `${window.location.origin}/boards/${board.id}/retros`;

  const tabs = [
    { name: "Retros", to: "retros" },
    { name: "Scrum Poker", to: "scrum-poker" },
    { name: "Reports", to: "reports" },
    { name: "Members", to: "members" },
  ];

  return (
    <div className="grid grid-cols-1 content-between md:py-4 px-3 text-zinc-200 bg-zinc-900 md:min-h-screen md:sticky left-0 top-0 bottom-0">
      <div className="flex flex-col">
        <div className="py-4 text-white w-full px-4">
          <Link to="/" className="">
            <img src={OpenRetroBanner} alt="" className="max-w-[10rem]" />
          </Link>
        </div>
        <div className="flex flex-col my-2 p-3 gap-3 bg-zinc-800 border border-zinc-700 rounded-lg">
          <div className="flex flex-col gap-1">
            <h1 className="text-xl text-zinc-200">📋{board.boardName}</h1>
            <h3 className="text-zinc-500">{board.createdBy}</h3>
          </div>
          <div>
            <ShareBoardModal
              boardRetroUrl={boardRetroUrl}
              board={board}
            ></ShareBoardModal>
          </div>
        </div>
        <ul className="flex flex-row md:flex-col gap-3 border-zinc-700 md:mb-4 overflow-auto my-3 md:my-5">
          {tabs.map((tab, index) => (
            <li key={`tab-index-${index}`} className="flex">
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
      <div className="flex my-3 justify-end md:justify-center gap-x-2">
        <TimerSlide></TimerSlide>
      </div>
    </div>
  );
}
