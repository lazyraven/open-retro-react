import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import BaseButton from "@/components/BaseButton";
import CountDownTimer from "@/components/CountDownTimer";
import BaseIcon from "@/components/BaseIcon";
import { ICONS } from "@/helpers/constant";

export default function TimerSlide(props) {
  const timeArray = [
    { id: 1, time: "5  minutes", clock: 300 },
    { id: 2, time: "10  minutes", clock: 600 },
    { id: 3, time: "15  minutes", clock: 900 },
    { id: 4, time: "20  minutes", clock: 1200 },
    { id: 5, time: "25  minutes", clock: 1500 },
    // { id: 6, time: "custom", clock: "custom" },
  ];
  const [open, setOpen] = useState(false);
  const [runtime, setRuntime] = useState(0);
  const [timerValue, setTimerValue] = useState(0);

  const handleStartTimer = () => {
    setRuntime(timerValue);
    setOpen(false);
  };

  const handleSetTimerLimit = (event, clock) => {
    setTimerValue(clock);
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
                    <div className="flex h-full flex-col overflow-y-scroll py-6 shadow-xl divide-y-2 gap-1 bg-zinc-900">
                      <div className="px-4 sm:px-6">
                        <Dialog.Title className="text-base font-semibold leading-6 text-white">
                          Timer
                        </Dialog.Title>
                      </div>
                      <div className="relative flex flex-wrap gap-3 mt-6 px-4 sm:px-6">
                        {/* Your content */}
                        {/* {timeClock.map((time, index) => { */}
                        {timeArray.map((rec, index) => {
                          return (
                            <div className="mb-2" key={"rec.id" + index}>
                              <BaseButton
                                theme="SECONDARY"
                                size="M"
                                type="radio"
                                className={`mt-2`}
                                onClick={(event) => {
                                  handleSetTimerLimit(event, rec.clock);
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