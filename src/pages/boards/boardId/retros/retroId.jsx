import { useEffect, useState } from "react";
import BaseIcon from "@/components/BaseIcon";
import { ICONS } from "@/helpers/constant";
import boardService from "@/services/board.service";
import { useParams } from "react-router-dom";
import NewNotes from "@/components/NewNotes";
import RetroDescription from "@/components/RetroDescription";

export default function RetroId() {
  const [notes, setNotes] = useState([]);

  const params = useParams();

  const getRetroNotes = async () => {
    try {
      const notes = await boardService.getRetroNotes({
        boardId: params.boardId,
        retroId: params.retroId,
        // retroId: params.OpenRetroId,
      });
      setNotes(notes);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getRetroNotes({ boardId: params.boardId, retroId: params.OpenRetroId });
  }, []);

  return (
    <div className="grid grid-cols-3 px-5 gap-5 bg-[#F1F2F5] min-h-screen">
      <div className="flex flex-col gap-3 py-2">
        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <h1 className="font-semibold text-[#3E3E52] text-lg capitalize">
              Went Well
            </h1>
            <BaseIcon
              iconName={ICONS.ellipsisvertical}
              className=" flex h-5 w-5 text-gray-400"
            ></BaseIcon>
          </div>
          <NewNotes
            tagName="went-well"
            notes={notes}
            getRetroNotes={getRetroNotes}
          ></NewNotes>
        </div>
        <div>
          {notes.map((note, index) => {
            if (!note || note.tagName !== "went-well") return null;
            return (
              <div className="mb-2" key={"note" + index}>
                <h1>went well</h1>
                <RetroDescription
                  note={note}
                  getRetroNotes={getRetroNotes}
                ></RetroDescription>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col gap-3 py-2">
        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <h1 className="font-semibold text-lg capitalize">To-Improve</h1>
            <BaseIcon
              iconName={ICONS.ellipsisvertical}
              className=" flex h-5 w-5 text-gray-400"
            ></BaseIcon>
          </div>
          <NewNotes
            tagName="to-improve"
            getRetroNotes={getRetroNotes}
          ></NewNotes>
        </div>
        <div>
          {notes.map((note, index) => {
            if (!note || note.tagName !== "to-improve") return null;
            return (
              <div className="mb-2" key={"note" + index}>
                <RetroDescription
                  note={note}
                  getRetroNotes={getRetroNotes}
                ></RetroDescription>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col gap-3 py-2">
        <div className=" flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <h1 className="font-semibold text-lg capitalize">Action Item</h1>
            <BaseIcon
              iconName={ICONS.ellipsisvertical}
              className=" flex h-5 w-5 text-gray-400"
            ></BaseIcon>
          </div>
          <NewNotes
            tagName="action-item"
            getRetroNotes={getRetroNotes}
          ></NewNotes>
        </div>
        <div>
          {notes.map((note, index) => {
            if (!note || note.tagName !== "action-item") return null;
            return (
              <div className="mb-2" key={"note" + index}>
                <RetroDescription
                  note={note}
                  getRetroNotes={getRetroNotes}
                ></RetroDescription>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
