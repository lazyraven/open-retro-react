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
  const [isShown, setIsShown] = useState(false);
  const params = useParams();
  let descriptionClsName = "";
  let inputClsName = "";
  // let buttonClsName = "";
  const descriptionClasses = () => {
    descriptionClsName =
      note.tagName === "went-well"
        ? "bg-[#009886]"
        : note.tagName === "action-item"
        ? "bg-[#A63EB9]"
        : note.tagName === "to-improve"
        ? "bg-[#E92C64]"
        : null;
    return descriptionClsName;
  };

  const getInputClasses = () => {
    inputClsName =
      note.tagName === "went-well"
        ? "border-[#009886]"
        : note.tagName === "action-item"
        ? "border-[#A63EB9]"
        : note.tagName === "to-improve"
        ? "border-[#E92C64]"
        : "border-[#009886]";
    return inputClsName;
  };

  // const getButtonClass = () => {
  //   buttonClsName =
  //     note.tagName === "went-well"
  //       ? "bg-[#009886] hover:bg-emerald-700"
  //       : note.tagName === "action-item"
  //       ? "bg-[#A63EB9] hover:bg-fuchsia-800"
  //       : note.tagName === "to-improve"
  //       ? "bg-[#E92C64] hover:bg-red-700"
  //       : "border-[#009886]";
  //   return buttonClsName;
  // };

  // const editModalOpen = () => {
  //   // setIsEditing(true);
  // };

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
            <form onSubmit={handleSubmit} className="relative w-full">
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

              <div className="absolute right-2 bottom-3 flex gap-2">
                <button
                  type="submit"
                  className={`flex justify-center text-zinc-900 items-center rounded-sm border-blue-100 bg-zinc-300 hover:bg-zinc-400 text-sm px-1`}
                >
                  Save
                </button>
                <button type="button" onClick={closeEditDescription}>
                  <BaseIcon
                    iconName={ICONS.Close}
                    className=" flex h-3 w-3 text-zinc-300"
                  ></BaseIcon>
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div
          onMouseEnter={() => setIsShown(true)}
          onMouseLeave={() => setIsShown(false)}
          className={`flex flex-col w-full justify-between rounded-md border-slate-300 relative bg-zinc-800`}
        >
          <div className="flex gap-2">
            <div
              className={` flex-none ${descriptionClasses()} rounded-tl-md rounded-bl-md h-34 w-2`}
            ></div>
            <h1 className="grow font-normal text-sm text-gray-300 py-4">
              {note.description}
            </h1>

            {isShown && (
              <div className="flex gap-2 absolute right-2 bottom-1">
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
            )}
          </div>
        </div>
      )}
    </>
  );
}
