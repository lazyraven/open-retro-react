import BaseIcon from "../components/BaseIcon";
import { ICONS } from "../helpers/constant";

import BaseNavbar from "./BaseNavbar";

export default function OpenRetroId() {
  return (
    <div>
      <BaseNavbar></BaseNavbar>
      <div className="grid grid-cols-3 px-5 py-5 gap-5 bg-[#F1F2F5]">
        <div className="flex flex-col gap-3">
          <div className="flex justify-between py-2">
            <h1 className="font-semibold text-lg">Went Well</h1>
            <button type="button">
              <BaseIcon
                iconName={ICONS.ellipsisvertical}
                className=" flex h-5 w-5 text-gray-400"
              ></BaseIcon>
            </button>
          </div>
          <button
            type="button"
            className="flex justify-center bg-[#E5E6EB] py-2 rounded-sm"
          >
            <BaseIcon
              iconName={ICONS.Plus}
              className=" h-4 w-4 text-gray-500"
            ></BaseIcon>
          </button>
          <div className="bg-teal-600 px-4 py-1 h-16  flex flex-auto justify-between rounded-sm text-white">
            <h1 className="font-semibold">I released code to production</h1>
            <button type="button">
              <BaseIcon
                iconName={ICONS.ellipsisvertical}
                className=" flex h-5 w-5 text-gray-200"
              ></BaseIcon>
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex justify-between py-2">
            <h1 className="font-semibold text-lg">To Improve</h1>
            <button type="button">
              <BaseIcon
                iconName={ICONS.ellipsisvertical}
                className=" flex h-5 w-5 text-gray-400"
              ></BaseIcon>
            </button>
          </div>
          <button
            type="button"
            className="flex justify-center bg-[#E5E6EB] py-2 rounded-sm"
          >
            <BaseIcon
              iconName={ICONS.Plus}
              className=" h-4 w-4 text-gray-500"
            ></BaseIcon>
          </button>
          <div className="bg-rose-600 px-4 py-1 h-16  flex flex-auto justify-between rounded-sm text-white">
            <h1 className="font-semibold">
              Need to improve testing, bug found
            </h1>
            <button type="button">
              <BaseIcon
                iconName={ICONS.ellipsisvertical}
                className=" flex h-5 w-5 text-gray-200"
              ></BaseIcon>
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex justify-between py-2">
            <h1 className="font-semibold text-lg">Action Items</h1>
            <button type="button">
              <BaseIcon
                iconName={ICONS.ellipsisvertical}
                className=" flex h-5 w-5 text-gray-400"
              ></BaseIcon>
            </button>
          </div>
          <button
            type="button"
            className="flex justify-center bg-[#E5E6EB] py-2 rounded-sm"
          >
            <BaseIcon
              iconName={ICONS.Plus}
              className=" h-4 w-4 text-gray-500"
            ></BaseIcon>
          </button>
          <div className="bg-fuchsia-600 px-4 py-1 h-16  flex flex-auto justify-between rounded-sm text-white">
            <h1 className="font-semibold">
              We finished 10 stories. some more details{" "}
            </h1>
            <button type="button">
              <BaseIcon
                iconName={ICONS.ellipsisvertical}
                className=" flex h-5 w-5 text-gray-200"
              ></BaseIcon>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
