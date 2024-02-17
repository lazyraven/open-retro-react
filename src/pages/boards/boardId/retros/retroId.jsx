import { useEffect, useState } from "react";
import BaseIcon from "@/components/BaseIcon";
import { ICONS } from "@/helpers/constant";
import boardService from "@/services/board.service";
import { useParams } from "react-router-dom";
import NewNotes from "../../../../components/NewNotes";

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

  // for list rendering
  const renderBoardRow = (note) => {
    switch (note.tag) {
      case "went-well":
        return (
          <div className="bg-[#009886] px-4 py-1 flex flex-col w-full justify-between rounded-sm text-white">
            <div className="flex justify-between">
              <h1 className="font-medium text-sm ">{note.description}</h1>
              <button type="button">
                <BaseIcon
                  iconName={ICONS.ellipsisvertical}
                  className=" flex h-5 w-5 text-gray-200"
                ></BaseIcon>
              </button>
            </div>
            <div className="flex gap-1 justify-end">
              <button type="button" className="flex gap-1 items-center">
                <BaseIcon
                  iconName={ICONS.LikeThumb}
                  className="flex h-4 w-4"
                ></BaseIcon>
                <p className="text-sm font-normal">0</p>
              </button>
              <button type="button" className="flex gap-1 items-center">
                <BaseIcon
                  iconName={ICONS.Comment}
                  className="flex h-4 w-4"
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
              <h1 className="font-medium text-sm text-[#FEFFFF]">
                {note.description}
              </h1>
              <button type="button">
                <BaseIcon
                  iconName={ICONS.ellipsisvertical}
                  className=" flex h-5 w-5 text-gray-200"
                ></BaseIcon>
              </button>
            </div>
            <div className="flex gap-1 justify-end ">
              <button type="button" className="flex gap-1 items-center">
                <BaseIcon
                  iconName={ICONS.LikeThumb}
                  className="flex h-4 w-4"
                ></BaseIcon>
                <p className="text-sm font-semibold">0</p>
              </button>
              <button type="button" className="flex gap-1 items-center">
                <BaseIcon
                  iconName={ICONS.Comment}
                  className="flex h-4 w-4"
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
              <h1 className="font-medium text-sm">{note.description}</h1>
              <button type="button">
                <BaseIcon
                  iconName={ICONS.ellipsisvertical}
                  className=" flex h-5 w-5 text-gray-200"
                ></BaseIcon>
              </button>
            </div>
            <div className="flex gap-1 justify-end items-center">
              <button type="button" className="flex gap-1 items-center">
                <BaseIcon
                  iconName={ICONS.LikeThumb}
                  className="flex h-4 w-4"
                ></BaseIcon>
                <p className="text-sm font-semibold">0</p>
              </button>
              <button type="button" className="flex gap-1 items-center">
                <BaseIcon
                  iconName={ICONS.Comment}
                  className="flex h-4 w-4"
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
          <NewNotes tagName="went-well" onNoteCreate="getNotes()"></NewNotes>
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
            <h1 className="font-semibold text-lg capitalize">Action Item</h1>
            <BaseIcon
              iconName={ICONS.ellipsisvertical}
              className=" flex h-5 w-5 text-gray-400"
            ></BaseIcon>
          </div>
          <NewNotes
            tagName="action-item"
            onNoteCreate="()=>{
                this.getNotes()
              }"
          ></NewNotes>
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
            <h1 className="font-semibold text-lg capitalize">To-Improve</h1>
            <BaseIcon
              iconName={ICONS.ellipsisvertical}
              className=" flex h-5 w-5 text-gray-400"
            ></BaseIcon>
          </div>
          <NewNotes tagName="to-improve"></NewNotes>
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
