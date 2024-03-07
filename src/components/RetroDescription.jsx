import BaseIcon from "@/components/BaseIcon";
import { ICONS } from "@/helpers/constant";
import { useState } from "react";
import boardService from "../services/board.service";
import { db } from "@/firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { useParams } from "react-router-dom";

export default function RetroDescription(props) {
  const { note } = props;
  const [editDescription, setEditDescription] = useState(false);
  const [editedDescription, setEditedDescription] = useState(note.description);
  const params = useParams();

  const descriptionClasses = () => {
    const { tagName } = note;
    switch (tagName) {
      case "went-well":
        return "bg-teal-600";
      case "to-improve":
        return "bg-pink-600";
      case "action-item":
        return "bg-fuchsia-600";
    }
  };

  const handleChange = (event) => {
    event.preventDefault();
    const { value } = event.target;
    setEditedDescription(value);
  };

  const editDescriptionModal = () => {
    setEditDescription(true);
  };

  const closeEditDescription = () => {
    setEditDescription(false);
    props.getRetroNotes();
  };

  const handleSubmit = async (e) => {
    const noteDetail = {
      description: editedDescription,
      noteId: note.id,
    };
    e.preventDefault();
    try {
      await boardService.updateNote(
        { boardId: params.boardId, retroId: params.retroId, noteId: note.id },
        noteDetail
      );
      setEditDescription(false);
      props.getRetroNotes();
    } catch (e) {
      console.log(e);
    }
  };

  const deleteNote = async (e) => {
    console.log("deleteNote", e, note.id);
    e.preventDefault();
    try {
      // await boardService.deleteRetro({ retroId: id });
      await deleteDoc(
        doc(
          db,
          "boards",
          params.boardId,
          "retros",
          params.retroId,
          "notes",
          note.id
        )
      );
      props.getRetroNotes();
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      {editDescription ? (
        <div className="flex border border-slate-700 rounded-md">
          <div
            className={`flex-none w-2 ${descriptionClasses()} rounded-tl-md rounded-bl-md`}
          ></div>
          <div className="grow">
            <form onSubmit={handleSubmit} className=" w-full">
              <div className="grow">
                <textarea
                  type="text"
                  rows="4"
                  cols="7"
                  name="editedDescription"
                  value={editedDescription}
                  onChange={handleChange}
                  className={`py-2 px-2 w-full resize-none text-sm rounded-sm text-slate-200 outline-none bg-transparent`}
                />
              </div>

              <div className="flex justify-end gap-2 px-2 py-1">
                <button
                  type="submit"
                  className={`flex justify-center text-zinc-200 items-center rounded-sm  bg-zinc-700 hover:bg-zinc-800 text-xs px-1`}
                >
                  Save
                </button>
                <button type="button" onClick={closeEditDescription}>
                  <BaseIcon
                    iconName={ICONS.Close}
                    className="flex h-4 w-4 text-zinc-300"
                  ></BaseIcon>
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div
          className={` flex flex-col w-full justify-between rounded-md border-slate-300 relative bg-zinc-800`}
        >
          <div className="flex gap-1 ">
            <div
              className={` flex-none ${descriptionClasses()} rounded-tl-md rounded-bl-md h-34 w-2`}
            ></div>
            <div className="flex flex-col gap-1 px-1 w-full parent relative">
              <h1 className="grow font-normal text-sm text-gray-300 py-4">
                {note.description}
              </h1>
              <div className="flex justify-between items-center gap-2 py-2 border-zinc-700">
                <div className="flex gap-1 items-center">
                  <span className="flex items-center justify-center bg-zinc-500 rounded-full h-5 w-5 text-white text-xs">
                    N
                  </span>
                  <p className="text-zinc-200 text-xs">Nisha Yadav</p>
                </div>
                <div className="child flex ">
                  <button onClick={editDescriptionModal} className="">
                    <BaseIcon
                      className="flex h-4 w-4 text-zinc-200 hover:text-zinc-300"
                      iconName={ICONS.Edit}
                    ></BaseIcon>
                  </button>
                  <button onClick={deleteNote} className="">
                    <BaseIcon
                      className="flex h-4 w-4 text-zinc-200 hover:text-zinc-300"
                      iconName={ICONS.Delete}
                    ></BaseIcon>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
