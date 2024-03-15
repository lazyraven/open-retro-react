import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function Example() {
  const [open, setOpen] = useState(true);
  const [timeClock, setTimeClock] = useState([]);
  const [color, setColor] = useState("");
  // const [isActiveColor, setIsActiveColor] = useState(false);

  useEffect(() => {
    // const timeArray = [
    //   { id: 1, time: "5  minutes" },
    //   { id: 2, time: "10  minutes" },
    //   { id: 3, time: "15  minutes" },
    //   { id: 4, time: "20  minutes" },
    //   { id: 5, time: "25  minutes" },
    //   { id: 6, time: "custom" },
    // ];
    const timeArray = [
      "5  minutes",
      "10  minutes",
      "15  minutes",
      "20  minutes",
      "25  minutes",
      "custom",
    ];
    setTimeClock(timeArray);
  }, []);

  // let buttonClass = "";

  const handleClick = (e, rec) => {
    console.log("buttonClick called", e, rec);
    setColor("bg-orange-500");
    // setIsActiveColor(true);
    //   this.setState({
    //     isClassActive: !this.state.isClassActive,
    // });
  };

  //   handleClick(e) {
  //     if(e.target.class === 'is-active'){
  //         e.target.className = '';
  //         console.log('remove')
  //     }else{
  //         e.target.className = 'is-active';
  //         console.log('add class')
  //     }
  // }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto relative w-screen max-w-md">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
                      <button
                        type="button"
                        className="relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                        onClick={() => setOpen(false)}
                      >
                        <span className="absolute -inset-2.5" />
                        <span className="sr-only">Close panel</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl divide-y-4 gap-1">
                    <div className="px-4 sm:px-6">
                      <Dialog.Title className="text-base font-semibold leading-6 text-gray-900">
                        Timer
                      </Dialog.Title>
                    </div>
                    <div className="relative flex flex-wrap gap-3 mt-6 px-4 sm:px-6">
                      {/* Your content */}
                      {timeClock.map((time, index) => {
                        return (
                          <div className="mb-2" key={"rec" + index}>
                            <button
                              type="submit"
                              className={`border-2 border-zinc-50 rounded-full text-zinc-900 items-center text-sm px-5  py-2 mt-2 ${color}`}
                              onClick={(event) => {
                                handleClick(event, time);
                              }}
                              //   className={
                              //     isActiveColor
                              //         ? "active"
                              //         : ""
                              // }
                              // className={({ isActive }) =>
                              //   isActive
                              //     ? `px-4 py-4 text-sm font-medium text-blue-500 whitespace-nowrap border-b border-blue-500 ${color}`
                              //     : "px-4 py-4 text-sm text-zinc-200 whitespace-nowrap font-medium"
                              // }
                            >
                              {time}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                    <div>
                      <button
                        type="submit"
                        className={`border-2 border-zinc-50 rounded-full text-zinc-900 items-center text-sm px-5 py-2 mt-2 bg-orange-500 w-full bottom-0`}
                      >
                        Start Timer
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
