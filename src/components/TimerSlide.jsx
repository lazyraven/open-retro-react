import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import BaseButton from "@/components/BaseButton";
import CountDownTimer from "@/components/CountDownTimer";
import BaseIcon from "@/components/BaseIcon";
import { ICONS } from "@/helpers/constant";

export default function TimerSlide() {
  const timeArray = [
    { id: 1, time: "5  minutes", seconds: 300 },
    { id: 2, time: "10  minutes", seconds: 600 },
    { id: 3, time: "15  minutes", seconds: 900 },
    { id: 4, time: "20  minutes", seconds: 1200 },
    { id: 5, time: "25  minutes", seconds: 1500 },
  ];
  const [open, setOpen] = useState(false);
  const [runtime, setRuntime] = useState(0);
  const [timerValue, setTimerValue] = useState(0);

  const handleStartTimer = () => {
    setRuntime(timerValue);
    setOpen(false);
  };

  const handleRadioChange = (event) => {
    setTimerValue(event.target.value);
  };

  return (
    <>
      <BaseButton
        theme="SECONDARY"
        size="M"
        type="button"
        onClick={() => setOpen(true)}
      >
        <div className="flex gap-1">
          <BaseIcon
            iconName={ICONS.ClockCircle}
            className="flex h-5 w-5 text-white"
          ></BaseIcon>
          Timer
        </div>
      </BaseButton>

      <div className="fixed inset-x-0 bottom-10 max-w-max mx-auto">
        {runtime && <CountDownTimer runtime={runtime}></CountDownTimer>}
      </div>

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
                  <Dialog.Panel className="pointer-events-auto relative w-screen max-w-xs">
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
                    <div className="grid grid-cols-1 h-full content-between overflow-y-scroll py-6 px-2 shadow-xl gap-1 bg-zinc-900">
                      <div className="col-span-1 px-4">
                        <Dialog.Title className="text-base font-semibold leading-6 text-white mb-4">
                          Timer
                        </Dialog.Title>
                        <div className="flex flex-wrap gap-3">
                          {timeArray.map((rec, index) => {
                            return (
                              <div key={"timer-value-" + index}>
                                <input
                                  id={rec.id}
                                  type="radio"
                                  name="runtime"
                                  value={rec.seconds}
                                  onChange={handleRadioChange}
                                />
                                <label
                                  className="text-zinc-200 my-radio-button"
                                  htmlFor={rec.id}
                                >
                                  {rec.time}
                                </label>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      <div className="col-span-1 px-4">
                        <BaseButton
                          type="button"
                          theme="PRIMARY"
                          size="XL"
                          radius="rounded-full"
                          className="w-full mt-2"
                          onClick={handleStartTimer}
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
    </>
  );
}
