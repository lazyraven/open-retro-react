import { useEffect, useState } from "react";
import BaseIcon from "@/components/BaseIcon";
import { ICONS } from "@/helpers/constant";
import boardService from "@/services/board.service";
import { useParams } from "react-router-dom";
import NewNotes from "../../../../components/NewNotes";

export default function RetroId() {
  const [notes, setNotes] = useState([]);
  const [isOpenWentWell, setisOpenWentWell] = useState(false);
  const [isOpenToImprove, setIsOpenToImprove] = useState(false);
  const [isOpenActionItem, setisOpenActionItem] = useState(false);

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

  const addRetroDescription = (tagName) => {
    tagName == "went-well"
      ? setisOpenWentWell(true)
      : tagName == "to-improve"
      ? setIsOpenToImprove(true)
      : tagName == "action-item"
      ? setisOpenActionItem(true)
      : "";
  };

  useEffect(() => {
    getNotes({ retroId: params.OpenRetroId });
  }, []);

  // for list rendering
  const renderBoardRow = (note) => {
    switch (note.tag) {
      case "went-well":
        return (
          <div className="bg-[#009886] px-4 py-1 flex flex-col w-full justify-between rounded-sm text-white">
            <div className="flex justify-between">
              <h1 className="font-semibold">{note.description}</h1>
              <button type="button">
                <BaseIcon
                  iconName={ICONS.ellipsisvertical}
                  className=" flex h-5 w-5 text-gray-200"
                ></BaseIcon>
              </button>
            </div>
            <div className="flex gap-1 justify-end">
              <button type="button" className="flex gap-1">
                <BaseIcon
                  iconName={ICONS.LikeThumb}
                  className="flex h-5 w-5"
                ></BaseIcon>
                <p className="text-sm font-semibold">0</p>
              </button>
              <button type="button" className="flex gap-1">
                <BaseIcon
                  iconName={ICONS.Comment}
                  className="flex h-5 w-5"
                ></BaseIcon>
                <p className="text-sm font-semibold">0</p>
              </button>
            </div>
          </div>
        );
      case "to-improve":
        return (
          <div className="bg-[#E92C64] px-4 py-1 flex flex-col justify-between rounded-sm text-white">
            <div className="flex justify-between">
              <h1 className="font-semibold">{note.description}</h1>
              <button type="button">
                <BaseIcon
                  iconName={ICONS.ellipsisvertical}
                  className=" flex h-5 w-5 text-gray-200"
                ></BaseIcon>
              </button>
            </div>
            <div className="flex gap-1 justify-end">
              <button type="button" className="flex gap-1">
                <BaseIcon
                  iconName={ICONS.LikeThumb}
                  className="flex h-5 w-5"
                ></BaseIcon>
                <p className="text-sm font-semibold">0</p>
              </button>
              <button type="button" className="flex gap-1">
                <BaseIcon
                  iconName={ICONS.Comment}
                  className="flex h-5 w-5"
                ></BaseIcon>
                <p className="text-sm font-semibold">0</p>
              </button>
            </div>
          </div>
        );
      case "action-item":
        return (
          <div className="bg-[#A63EB9] px-4 py-1   flex flex-col justify-between rounded-sm text-white">
            <div className="flex justify-between">
              <h1 className="font-semibold">{note.description}</h1>
              <button type="button">
                <BaseIcon
                  iconName={ICONS.ellipsisvertical}
                  className=" flex h-5 w-5 text-gray-200"
                ></BaseIcon>
              </button>
            </div>
            <div className="flex gap-1 justify-end">
              <button type="button" className="flex gap-1">
                <BaseIcon
                  iconName={ICONS.LikeThumb}
                  className="flex h-5 w-5"
                ></BaseIcon>
                <p className="text-sm font-semibold">0</p>
              </button>
              <button type="button" className="flex gap-1">
                <BaseIcon
                  iconName={ICONS.Comment}
                  className="flex h-5 w-5"
                ></BaseIcon>
                <p className="text-sm font-semibold">0</p>
              </button>
            </div>
          </div>
        );
    }
  };

  // description modal box
  return (
    <div className="grid grid-cols-3 px-5 py-5 gap-5 bg-[#F1F2F5]">
      <div className="flex flex-col gap-3 py-2">
        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <h1 className="font-semibold text-xl capitalize">Went-Well</h1>
            <BaseIcon
              iconName={ICONS.ellipsisvertical}
              className=" flex h-5 w-5 text-gray-400"
            ></BaseIcon>
          </div>
          <button
            type="button"
            className="flex justify-center bg-[#E5E6EB] hover:bg-slate-200 py-3 rounded-sm w-full"
            onClick={() => {
              addRetroDescription("went-well");
            }}
          >
            <BaseIcon
              iconName={ICONS.Plus}
              className=" h-4 w-4 text-gray-500"
            ></BaseIcon>
          </button>
          {isOpenWentWell && (
            <NewNotes
              tagName="went-well"
              handleClose={isOpenWentWell}
              onNoteCreate="getNotes()"
            ></NewNotes>
          )}
        </div>
        {notes.map((note, index) => {
          return (
            <div className="flex flex-col gap-3" key={note.tag + index}>
              {note.tag === "went-well" ? (
                <div>{renderBoardRow(note)}</div>
              ) : null}
            </div>
          );
        })}
      </div>

      <div className="flex flex-col gap-3 py-2">
        <div className=" flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <h1 className="font-semibold text-xl capitalize">Action-Item</h1>
            <BaseIcon
              iconName={ICONS.ellipsisvertical}
              className=" flex h-5 w-5 text-gray-400"
            ></BaseIcon>
          </div>
          <button
            type="button"
            className="flex justify-center bg-[#E5E6EB] hover:bg-slate-200 py-3 rounded-sm w-full"
            onClick={() => {
              addRetroDescription("action-item");
            }}
          >
            <BaseIcon
              iconName={ICONS.Plus}
              className="h-4 w-4 text-gray-500"
            ></BaseIcon>
          </button>

          {isOpenActionItem && (
            <NewNotes
              tagName="action-item"
              onNoteCreate="()=>{
                this.getNotes()
              }"
            ></NewNotes>
          )}
        </div>
        {notes.map((note, index) => {
          return (
            <div className="flex flex-col gap-3" key={note.tag + index}>
              {note.tag === "action-item" ? (
                <div>{renderBoardRow(note)}</div>
              ) : null}
            </div>
          );
        })}
      </div>

      <div className="flex flex-col gap-3 py-2">
        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <h1 className="font-semibold text-xl capitalize">To-Improve</h1>
            <BaseIcon
              iconName={ICONS.ellipsisvertical}
              className=" flex h-5 w-5 text-gray-400"
            ></BaseIcon>
          </div>
          <button
            type="button"
            className="flex justify-center bg-[#E5E6EB] hover:bg-slate-200 py-3 rounded-sm w-full"
            onClick={() => {
              addRetroDescription("to-improve");
            }}
          >
            <BaseIcon
              iconName={ICONS.Plus}
              className=" h-4 w-4 text-gray-500"
            ></BaseIcon>
          </button>

          {isOpenToImprove && <NewNotes tagName="to-improve"></NewNotes>}
        </div>
        {notes.map((note, index) => {
          return (
            <div className="flex flex-col gap-3" key={note.tag + index}>
              {note.tag === "to-improve" ? (
                <div>{renderBoardRow(note)}</div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
