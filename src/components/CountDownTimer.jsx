import { useState, useEffect } from "react";
// import BaseButton from "@/components/BaseButton";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useParams } from "react-router-dom";
// import stopwatchService from "@/services/sto.service";

export default function Countdown(props) {
  const { runtime, setRuntime } = props;
  const [countDown, setCountDown] = useState(runtime);
  // const [stopwatchState, setStopwatchState] = useState({});

  const [open, setOpen] = useState(true);
  // const params = useParams();

  useEffect(() => {
    let timerId;

    timerId = setInterval(() => {
      setCountDown((countDown) => {
        if (countDown > 0) {
          return countDown - 1;
        } else {
          clearInterval(timerId);
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  const closeCountDown = () => {
    setOpen(false);
    // clearInterval(0);
    setRuntime(0);
  };

  const seconds = String(countDown % 60).padStart(2, 0);
  const minutes = String(Math.floor(countDown / 60)).padStart(2, 0);

  // async function updateStopwatch() {
  //   await stopwatchService.updateStopwatch(
  //     { boardId: params.boardId },
  //     {
  //       ...stopwatchState,
  //       startTime: !stopwatchState.startTime,
  //       runTime: stopwatchState.runTime,
  //     }
  //   );
  // }

  return (
    <>
      {open && (
        <div>
          <div className="flex text-zinc-800 center py-3 px-4 bg-blue-50 shadow-2xl rounded-full">
            <p className="font-semibold">
              Time: {minutes}:{seconds}
            </p>
          </div>
          <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
            <button
              type="button"
              className="relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
              onClick={closeCountDown}
            >
              <span className="absolute -inset-2.5" />
              <span className="sr-only">Close panel</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
