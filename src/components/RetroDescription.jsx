import BaseIcon from "@/components/BaseIcon";
import { ICONS } from "@/helpers/constant";
import { useState } from "react";
import boardService from "../services/board.service";
import { db } from "@/firebase";
import { deleteDoc, doc } from "firebase/firestore";

export default function RetroDescription(props) {
  const { note } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [editDescription, setEditDescription] = useState(false);
  const [editedDescription, setEditedDescription] = useState(note.description);

  let descriptionClsName = "";
  let inputClsName = "";
  let buttonClsName = "";
  const descriptionClasses = () => {
    descriptionClsName =
      note.tag === "went-well"
        ? "bg-[#009886]"
        : note.tag === "action-item"
        ? "bg-[#A63EB9]"
        : note.tag === "to-improve"
        ? "bg-[#E92C64]"
        : null;
    return descriptionClsName;
  };

  const getInputClasses = () => {
    inputClsName =
      note.tag === "went-well"
        ? "border-[#009886]"
        : note.tag === "action-item"
        ? "border-[#A63EB9]"
        : note.tag === "to-improve"
        ? "border-[#E92C64]"
        : "border-[#009886]";
    return inputClsName;
  };

  const getButtonClass = () => {
    buttonClsName =
      note.tag === "went-well"
        ? "bg-[#009886] hover:bg-emerald-700"
        : note.tag === "action-item"
        ? "bg-[#A63EB9] hover:bg-fuchsia-800"
        : note.tag === "to-improve"
        ? "bg-[#E92C64] hover:bg-red-700"
        : "border-[#009886]";
    return buttonClsName;
  };

  const editModalOpen = () => {
    setIsEditing(true);
  };

  const handleChange = (event) => {
    event.preventDefault();
    const { value } = event.target;
    setEditedDescription(value);
  };

  const editDescriptionModal = () => {
    setEditDescription(true);
    setIsEditing(false);
  };

  const closeEditDescription = () => {
    setEditDescription(false);
    props.getNotes();
  };

  const handleSubmit = async (e) => {
    const noteDetail = {
      description: editedDescription,
      noteId: note.id,
    };
    e.preventDefault();
    try {
      boardService.updateNote(noteDetail);
      setEditDescription(false);
      props.getNotes();
    } catch (e) {
      console.log(e);
    }
  };

  const deleteDescriptionModal = async (e, id) => {
    e.preventDefault();
    try {
      // await boardService.deleteRetro({ retroId: id });
      await deleteDoc(doc(db, "notes", id));
      // getRetroDetails();
      props.getNotes();
    } catch (e) {
      console.log(e);
    }
    setIsEditing(false);
  };
  return (
    <>
      {editDescription ? (
        <form onSubmit={handleSubmit} className="relative w-full">
          <textarea
            type="text"
            rows="2"
            cols="7"
            name="editedDescription"
            value={editedDescription}
            onChange={handleChange}
            className={`border-[3.5px] py-1 px-2 w-full resize-none text-sm rounded-sm outline-none ${getInputClasses()}`}
          />
          <div className="absolute right-2 bottom-3 flex gap-1">
            <button
              type="submit"
              className={`flex justify-center text-white items-center rounded-sm border-blue-100 text-xs px-1 ${getButtonClass()}`}
            >
              Save
            </button>
            <button type="button" onClick={closeEditDescription}>
              <BaseIcon
                iconName={ICONS.Close}
                className=" flex h-3 w-3 text-gray-600"
              ></BaseIcon>
            </button>
          </div>
        </form>
      ) : (
        <div
          className={`${descriptionClasses()} px-2 py-1 flex flex-col w-full  justify-between rounded-sm text-white`}
        >
          <div className="flex justify-between relative">
            <h1 className="font-normal text-sm ">{note.description}</h1>
            <button type="button" onClick={editModalOpen} className="">
              <BaseIcon
                iconName={ICONS.ellipsisvertical}
                className="flex h-5 w-5 text-gray-200 "
              ></BaseIcon>
            </button>
            {isEditing && (
              <ul className="absolute right-0 top-3 bg-slate-200 rounded-md z-10">
                <li>
                  <button
                    onClick={editDescriptionModal}
                    className="text-black text-xs w-full px-6 py-1 rounded-tr-md rounded-tl-md hover:bg-slate-300"
                  >
                    edit
                  </button>
                </li>
                <li>
                  <button
                    onClick={(event) => {
                      deleteDescriptionModal(event, note.id);
                    }}
                    className="text-black text-xs px-2 py-1 w-full rounded-br-md rounded-bl-md hover:bg-slate-300"
                  >
                    delete
                  </button>
                </li>
              </ul>
            )}
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
      )}
    </>
  );
}
