import BaseIcon from "@/components/BaseIcon";
import { ICONS } from "@/helpers/constant";
import { useState } from "react";
import { useParams } from "react-router-dom";
import BaseFirstChar from "./BaseFirstChar";
import notesService from "@/services/notes.service";
import BaseTextarea from "@/components/form-inputs/BaseTextarea";
import BaseButton from "@/components/BaseButton";
import { getBoardMemberLocalStorage } from "@/utils/common.util";

export default function EditNote(props) {
  const { note, boardId } = props;
  const storedMember = getBoardMemberLocalStorage({ boardId });

  const [isEditMode, setEditMode] = useState(false);
  const [editedDescription, setEditedDescription] = useState(note.description);
  const params = useParams();
  const isMemberCreator = storedMember && storedMember.id === note.createdById;

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
    setEditMode(true);
  };

  const closeEditDescription = () => {
    setEditedDescription(note.description);
    setEditMode(false);
  };

  const handleSubmit = async (e) => {
    const noteDetail = {
      description: editedDescription,
      noteId: note.id,
    };
    e.preventDefault();
    try {
      await notesService.updateRetroNote(
        { retroId: params.retroId, noteId: note.id },
        noteDetail
      );
      setEditMode(false);
    } catch (e) {
      console.log(e);
    }
  };

  const deleteNote = async (e) => {
    e.preventDefault();
    try {
      await notesService.deleteRetroNote({
        retroId: params.retroId,
        noteId: note.id,
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      {isEditMode ? (
        <div className="flex border border-zinc-700 rounded-md">
          <div
            className={`flex-none w-2 ${descriptionClasses()} rounded-tl-md rounded-bl-md`}
          ></div>
          <div className="grow">
            <form onSubmit={handleSubmit} className="w-full p-1 bg-zinc-800">
              <div className="grow">
                <BaseTextarea
                  name="editedDescription"
                  value={editedDescription}
                  onChange={handleChange}
                  className={`p-2 w-full bg-zinc-800 rounded-sm text-zinc-200 outline-none`}
                ></BaseTextarea>
              </div>

              <div className="flex justify-end gap-3 p-1">
                <button type="button" onClick={closeEditDescription}>
                  <BaseIcon
                    iconName={ICONS.Close}
                    className="flex h-5 w-5 text-zinc-200"
                  ></BaseIcon>
                </button>
                <BaseButton
                  theme="PRIMARY"
                  type="submit"
                  radius="rounded-full"
                  size="S"
                >
                  Save
                </BaseButton>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div
          className={` flex flex-col w-full justify-between rounded-md border-zinc-300 relative bg-zinc-800`}
        >
          <div className="flex">
            <div
              className={` flex-none ${descriptionClasses()} rounded-tl-md rounded-bl-md h-34 w-2`}
            ></div>
            <div className="flex flex-col gap-y-3 px-3 py-2 w-full parent relative">
              <p className="text-zinc-300">{note.description}</p>
              <div className="flex justify-between p-1 items-center gap-2 border-zinc-700">
                <div className="flex gap-1 items-center">
                  <BaseFirstChar word={note?.createdBy}></BaseFirstChar>
                  <p className="text-zinc-200 text-xs">{note.createdBy}</p>
                </div>
                {isMemberCreator && (
                  <div className="child flex gap-3">
                    <button onClick={editDescriptionModal} className="">
                      <BaseIcon
                        className="flex h-4 w-4 text-zinc-200 hover:text-zinc-100"
                        iconName={ICONS.Edit}
                      ></BaseIcon>
                    </button>
                    <button onClick={deleteNote} className="">
                      <BaseIcon
                        className="flex h-4 w-4 text-zinc-200 hover:text-zinc-100"
                        iconName={ICONS.Delete}
                      ></BaseIcon>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
