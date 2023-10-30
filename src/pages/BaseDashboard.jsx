import BaseIcon from "../components/BaseIcon";
import { ICONS } from "../helpers/constant";

import { useRef } from "react";
export default function BaseDashBoard() {
  const nameRef = useRef();
  const closeForm = (e) => {
    console.log("event", e);
  };

  const addDashBoard = () => {
    console.log("addDashBoard called");
  };

  const handleSave = async (e) => {
    e.preventDefault();
    console.log("e", e);
    let data = {
      name: nameRef.current.value,
    };
    console.log("data", data);
    try {
      // addDoc(messageCollection, data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-neutral-600">Dashboard</h1>
      <div className=" flex  py-4 ">
        <button
          type="button"
          className="border-2 border-neutral-600 hover:border-blue-500 hover:text-blue-500 border-dashed h-40 w-60 flex flex-col gap-1 justify-center items-center rounded-md"
          onClick={addDashBoard}
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
      <form onSubmit={handleSave}>
        <div className="space-y-12 flex justify-center mt-3">
          <div className="border-b border-gray-900/10 pb-12 border-2 border-zinc-300 p-3">
            <div className="mt-3 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="first-name"
                    ref={nameRef}
                    id="first-name"
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
                  />
                </div>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button
                type="button"
                className="text-sm font-semibold leading-6 text-gray-900"
                onClick={closeForm}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
