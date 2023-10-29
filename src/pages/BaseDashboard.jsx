import BaseIcon from "../components/BaseIcon";
import { ICONS } from "../helpers/constant";

export default function BaseDashBoard() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-neutral-600">Dashboard</h1>
      <div className=" flex  py-4 ">
        <button
          type="button"
          className="border-2 border-neutral-600 hover:border-blue-500  hover:text-blue-500 border-dashed h-40 w-60 flex flex-col gap-1 justify-center items-center rounded-md"
        >
          <div className=" bg-[#C0C0D4] rounded-full px-2 py-2">
            <BaseIcon
              iconName={ICONS.Plus}
              className=" flex h-6 w-6 text-white"
            ></BaseIcon>
          </div>
          <h1 className="text-sm">Add boards</h1>
        </button>
      </div>
    </div>
  );
}
