import BaseTextarea from "@/components/form-inputs/BaseTextarea";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function LeanNote({ tasks, setTasks }) {
  const [task, setTask] = useState({
    id: "",
    name: "",
    status: "toDiscuss",
  });

  const handelSubmit = (e) => {
    e.preventDefault();

    setTasks((prev) => {
      const note = [...prev, task];
      localStorage.setItem("leanTasks", JSON.stringify(note));
      return note;
    });
  };
  console.log(task);
  return (
    <form onSubmit={handelSubmit} className="flex flex-col gap-3">
      <BaseTextarea
        name="description"
        value={task.name}
        onChange={(e) =>
          setTask({ ...task, id: uuidv4(), name: e.target.value })
        }
        placeholder="Type note..."
        className={`p-2 w-full bg-zinc-800 rounded-sm text-zinc-200 outline-none`}
      ></BaseTextarea>
      <button
        type="submit"
        className="px-3 py-2 bg-slate-100 text-black rounded-md hover:bg-slate-200"
      >
        create
      </button>
    </form>
  );
}
