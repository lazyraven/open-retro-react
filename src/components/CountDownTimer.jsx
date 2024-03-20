import { useState, useRef, useEffect } from "react";

export default function Countdown(props) {
  // const [addTime, setAddtime] = useState();
  const [countDown, setCountDown] = useState(0);
  const [runTimer, setRunTimer] = useState(false);
  const { setCountDownDisplay, queryTime } = props;

  useEffect(() => {
    console.log("props", props);
    // setCountDownDisplay(true);
    let timerId;

    if (runTimer) {
      setCountDown(60 * queryTime);
      console.log("countDown", countDown);
      timerId = setInterval(() => {
        setCountDown((countDown) => countDown - 1);
      }, 1000);
    } else {
      clearInterval(timerId);
    }

    if (countDown < 0 && runTimer) {
      console.log("expired");
      setRunTimer(false);
      setCountDown(0);
    }
    setRunTimer((t) => !t);
    // togglerTimer();
    return () => clearInterval(timerId);
  }, [countDown, runTimer]);

  // const togglerTimer = () => setRunTimer((t) => !t);
  console.log("countDown11", countDown);
  const seconds = String(countDown % 60).padStart(2, 0);
  const minutes = String(Math.floor(countDown / 60)).padStart(2, 0);

  console.log("countDown1122", minutes, seconds, countDown);

  return (
    <div className="flex text-zinc-200 center p-3 bg-zinc-800 rounded-full">
      <div>
        Time: {minutes}:{seconds}
      </div>
      <span>{runTimer}</span>

      {/* <button type="button" onClick={togglerTimer}>
        {runTimer}
        {runTimer ? "Stop" : "Start"}
      </button> */}
    </div>
  );
}
