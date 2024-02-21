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

  const getNotes = async () => {
    try {
      const notes = await boardService.getNotes({
        retroId: params.retroId,
        // retroId: params.OpenRetroId,
      });
      setNotes(notes);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getNotes({ retroId: params.OpenRetroId });
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
          {/* onNoteCreate={getNotes()} */}
          <NewNotes tagName="went-well" notes={notes}></NewNotes>
        </div>
        <div>
          {notes.map((note, index) => {
            if (!note || note.tag !== "went-well") return null;
            return (
              <div className="mb-2" key={"note" + index}>
                <RetroDescription note={note}></RetroDescription>
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
          {/* onNoteCreate={getNotes()} */}
          <NewNotes tagName="to-improve"></NewNotes>
        </div>
        <div>
          {notes.map((note, index) => {
            if (!note || note.tag !== "to-improve") return null;
            return (
              <div className="mb-2" key={"note" + index}>
                <RetroDescription
                  note={note}
                  // getNotes={getNotes()}
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
          {/* onNoteCreate={getNotes()} */}
          <NewNotes tagName="action-item"></NewNotes>
        </div>
        <div>
          {notes.map((note, index) => {
            if (!note || note.tag !== "action-item") return null;
            return (
              <div className="mb-2" key={"note" + index}>
                <RetroDescription note={note}></RetroDescription>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
