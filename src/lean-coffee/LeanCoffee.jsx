import LeanNote from "@/components/LeanNote";
import { useState, useEffect } from "react";

export default function LeanCoffee() {
  const [discussingItems, setDiscussingItems] = useState([]);
  const [discussedItems, setDiscussedItems] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const savedTasks = localStorage.getItem("leanTasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  const moveToDiscussing = (taskIndex) => {
    const task = tasks[taskIndex];
    setDiscussingItems([...discussingItems, task]);
    setTasks(tasks.filter((_, index) => index !== taskIndex));
  };

  const moveToDiscussed = (taskIndex) => {
    const task = discussingItems[taskIndex];
    setDiscussedItems([...discussedItems, task]);
    setDiscussingItems(
      discussingItems.filter((_, index) => index !== taskIndex)
    );
  };

  const moveBackToDiscuss = (taskIndex) => {
    const task = discussingItems[taskIndex];
    setTasks([...tasks, task]);
    setDiscussingItems(
      discussingItems.filter((_, index) => index !== taskIndex)
    );
  };

  const moveFromDiscussedToDiscussing = (taskIndex) => {
    const task = discussedItems[taskIndex];
    setDiscussingItems([...discussingItems, task]);
    setDiscussedItems(discussedItems.filter((_, index) => index !== taskIndex));
  };

  return (
    <div className="flex flex-col gap-y-3">
      <h1 className="text-center text-3xl text-zinc-200">
        Lean Coffee Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-5 gap-y-3 pb-16 text-zinc-200 px-3 w-full">
        <div className="flex flex-col gap-3">
          <h5 className="font-semibold text-center text-zinc-200 capitalize">
            To-Discuss
          </h5>
          <LeanNote tasks={tasks} setTasks={setTasks} />
          {tasks.map((data, index) => (
            <div
              key={`task-${index}`}
              className="bg-zinc-800 rounded-md mb-2 p-3 cursor-pointer hover:bg-zinc-700 transition-colors"
              onClick={() => moveToDiscussing(index)}
            >
              {data.name}
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <h5 className="font-semibold text-center text-zinc-200 capitalize">
            To-Discussing
          </h5>
          {discussingItems.map((data, index) => (
            <div
              key={`discussing-${index}`}
              className="bg-zinc-800 rounded-md mb-2 p-3 cursor-pointer hover:bg-zinc-700 transition-colors"
            >
              <div className="mb-2">{data.name}</div>
              <div className="flex gap-2 text-sm">
                <button
                  onClick={() => moveBackToDiscuss(index)}
                  className="bg-zinc-500 px-2 text-white text-xs py-[2px] rounded hover:bg-zinc-600"
                >
                  Back
                </button>
                <button
                  onClick={() => moveToDiscussed(index)}
                  className="bg-slate-100 text-black text-xs px-2 py-[2px] rounded hover:bg-slate-200"
                >
                  Done
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <h5 className="font-semibold text-center text-zinc-200 capitalize">
            To-Discussed
          </h5>
          {discussedItems.map((data, index) => (
            <div
              key={`discussed-${index}`}
              className="bg-zinc-800 rounded-md mb-2 p-3 cursor-pointer hover:bg-zinc-700 transition-colors"
            >
              <div className="mb-2">{data.name}</div>
              <button
                onClick={() => moveFromDiscussedToDiscussing(index)}
                className="bg-blue-600 px-2 text-xs py-[2px] rounded hover:bg-blue-500"
              >
                Reopen
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
