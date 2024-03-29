import { useState, useEffect } from "react";

export default function Countdown(props) {
  const { startSeconds } = props;
  const [countDown, setCountDown] = useState(
    startSeconds > 0 ? startSeconds : 0
  );

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

  const seconds = String(countDown % 60).padStart(2, 0);
  const minutes = String(Math.floor(countDown / 60)).padStart(2, 0);

  return (
    <div className="flex font-semibold text-zinc-800 center py-3 px-4 bg-blue-50 shadow-2xl rounded-full">
      Time left: {minutes}:{seconds}
    </div>
  );
}
