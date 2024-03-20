import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import BaseButton from "@/components/BaseButton";

export default function Example(props) {
  const [open, setOpen] = useState(true);
  const [timeClock, setTimeClock] = useState([]);
  const [color, setColor] = useState("");
  const { setOpenSlide, setCountDownDisplay, onQuery } = props;

  // const [isActiveColor, setIsActiveColor] = useState(false);

  useEffect(() => {
    const timeArray = [
      { id: 1, time: "5  minutes", clock: 5 },
      { id: 2, time: "10  minutes", clock: 10 },
      { id: 3, time: "15  minutes", clock: 15 },
      { id: 4, time: "20  minutes", clock: 20 },
      { id: 5, time: "25  minutes", clock: 25 },
      { id: 6, time: "custom", clock: "custom" },
    ];
    // let timeArray = [
    //   "5  minutes",
    //   "10  minutes",
    //   "15  minutes",
    //   "20  minutes",
    //   "25  minutes",
    //   "custom",
    // ];
    setTimeClock(timeArray);
  }, []);

  const handleClick = (e, rec) => {
    console.log("props", props);
    console.log("buttonClick called", e, rec);
    setOpenSlide(false);
    // setCountDownDisplay(true);
    // setQuery(rec);
    onQuery(rec);
  };

  const closeTimerSlide = () => {
    console.log("closeTimerSlide", props);
    setOpen(false);
    setOpenSlide(false);
  };

  const startTimer = (event) => {
    console.log("startTimer", event);
    setOpen(false);
    setOpenSlide(false);
  };

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
                        onClick={
                          closeTimerSlide

                          // () => setOpen(false)
                        }
                      >
                        <span className="absolute -inset-2.5" />
                        <span className="sr-only">Close panel</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="flex h-full flex-col overflow-y-scroll py-6 shadow-xl divide-y-2 gap-1 bg-zinc-900">
                    <div className="px-4 sm:px-6">
                      <Dialog.Title className="text-base font-semibold leading-6 text-white">
                        Timer
                      </Dialog.Title>
                    </div>
                    <div className="relative flex flex-wrap gap-3 mt-6 px-4 sm:px-6">
                      {/* Your content */}
                      {/* {timeClock.map((time, index) => { */}
                      {timeClock.map((rec, index) => {
                        return (
                          <div className="mb-2" key={"rec.id" + index}>
                            {/* <button
                              type="submit"
                              className={`border-2 border-zinc-600 rounded-full items-center text-sm px-5 py-2 mt-2 ${color} text-white`}
                              onClick={(event) => {
                                handleClick(event, time);
                              }}
                            >
                              {time}
                            </button> */}
                            <BaseButton
                              theme="SECONDARY"
                              size="M"
                              type="radio"
                              className={`mt-2`}
                              onClick={(event) => {
                                handleClick(event, rec.clock);
                              }}
                            >
                              {rec.time}
                            </BaseButton>
                          </div>
                        );
                      })}
                    </div>
                    <div>
                      <BaseButton
                        type="button"
                        theme="PRIMARY"
                        size="XL"
                        radius="rounded-full"
                        className="w-full mt-2"
                        onClick={(event) => {
                          startTimer(event);
                        }}
                      >
                        Start Timer
                      </BaseButton>
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
