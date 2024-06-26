import { Fragment, useEffect, useState, useContext } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import BaseButton from "@/components/BaseButton";
import CountDownTimer from "@/components/CountDownTimer";
import BaseIcon from "@/components/BaseIcon";
import { ICONS } from "@/helpers/constant";
import BoardContext from "@/contexts/BoardContext";
import { useParams } from "react-router-dom";
import { getBoardMemberLocalStorage } from "@/utils/common.util";
import stopwatchService from "@/services/stopwatch.service";

export default function TimerSlide() {
  const timeArray = [
    { id: 1, time: "5  minutes", seconds: 300 },
    { id: 2, time: "10  minutes", seconds: 600 },
    { id: 3, time: "15  minutes", seconds: 900 },
    { id: 4, time: "20  minutes", seconds: 1200 },
    { id: 5, time: "25  minutes", seconds: 1500 },
  ];
  const [open, setOpen] = useState(false);
  const [timerValue, setTimerValue] = useState(0);
  const { board } = useContext(BoardContext);
  const params = useParams();
  const storedMember = getBoardMemberLocalStorage({ boardId: params.boardId });
  const [stopwatchState, setStopwatchState] = useState(initStopwatch());

  function initStopwatch() {
    return {
      runtime: 0,
      startTime: "",
    };
  }

  const handleStartTimer = () => {
    setOpen(false);
    updateStopwatch();
  };

  const handleRadioChange = (event) => {
    setTimerValue(event.target.value);
  };

  function listenStopwatchStateChange() {
    stopwatchService.listenStopwatchStateChange(
      { boardId: params.boardId },
      (doc) => {
        if (doc) {
          setStopwatchState(doc);
        } else {
          setStopwatchState(initStopwatch());
        }
      }
    );
  }

  async function clearStopwatchState() {
    await stopwatchService.clearStopwatchState({ boardId: params.boardId });
  }

  async function updateStopwatch() {
    await stopwatchService.updateStopwatch(
      { boardId: params.boardId },
      {
        ...stopwatchState,
        startTime: new Date().getTime(),
        runtime: timerValue,
      }
    );
  }

  useEffect(() => {
    listenStopwatchStateChange();
  }, []);

  const timediff = Math.floor(
    (new Date().getTime() - stopwatchState.startTime) / 1000
  );
  const runtimeLeft = stopwatchState.runtime - timediff;
  return (
    <>
      {board?.owner == storedMember.id && (
        <BaseButton
          theme="SECONDARY"
          size="M"
          type="button"
          onClick={() => setOpen(true)}
        >
          <div className="flex items-center gap-1">
            <BaseIcon
              iconName={ICONS.Stopwatch}
              className="flex h-5 w-5 text-white"
            ></BaseIcon>
            Stopwatch
          </div>
        </BaseButton>
      )}

      {!!stopwatchState?.runtime && (
        <div className="fixed inset-x-0 bottom-10 max-w-max mx-auto">
          <div className="flex gap-2">
            <BaseButton
              type="button"
              theme="TRANSPARENT"
              radius="rounded-full"
              onClick={clearStopwatchState}
            >
              {board?.owner == storedMember.id && (
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              )}
            </BaseButton>
            <CountDownTimer startSeconds={runtimeLeft}></CountDownTimer>
          </div>
        </div>
      )}

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
                      <div className="absolute left-1 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
                        <button
                          type="button"
                          className="relative rounded-md text-gray-300 hover:text-white "
                          onClick={() => setOpen(false)}
                        >
                          <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </Transition.Child>
                    <div className="grid grid-cols-1 h-full content-between overflow-y-scroll py-6 px-2 shadow-xl gap-1 bg-zinc-900">
                      <div className="col-span-1 px-4">
                        <Dialog.Title className="text-base font-semibold leading-6 text-white mb-4">
                          Stopwatch
                        </Dialog.Title>

                        <div className="grid grid-cols-2 w-full gap-6">
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
                                  className="text-zinc-200 my-radio-button w-[7.5rem]"
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
                          Start Stopwatch
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
