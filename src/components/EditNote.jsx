import _get from "lodash.get";
import BaseIcon from "@/components/BaseIcon";
import { ICONS } from "@/helpers/constant";
import { useState } from "react";
import { useParams } from "react-router-dom";
import BaseFirstChar from "./BaseFirstChar";
import notesService from "@/services/notes.service";
import BaseTextarea from "@/components/form-inputs/BaseTextarea";
import BaseButton from "@/components/BaseButton";
import BaseConfirm from "@/components/BaseConfirm";
import { HandThumbUpIcon } from "@heroicons/react/24/outline";
import { getBoardMemberLocalStorage } from "@/utils/common.util";
import { toast } from "react-toastify";
import { RETRO_STATES, MAX_RETRO_VOTES_ALLOWED } from "@/helpers/constant";

export default function EditNote(props) {
  const { note, boardId, retroState, memberVoteCount } = props;
  const storedMember = getBoardMemberLocalStorage({ boardId });

  const [isEditMode, setEditMode] = useState(false);
  const [editedDescription, setEditedDescription] = useState(note.description);
  const params = useParams();
  const isMemberCreator = storedMember && storedMember.id === note.createdById;
  const memberVote = _get(note, `members.${storedMember.id}.vote`, 0);

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

  const handleSubmit = async () => {
    const noteDetail = {
      description: editedDescription,
      noteId: note.id,
    };
    await notesService.updateRetroNote(
      { retroId: params.retroId, noteId: note.id },
      noteDetail
    );
    setEditMode(false);
  };

  const deleteNote = async () => {
    await notesService.deleteRetroNote({
      retroId: params.retroId,
      noteId: note.id,
    });
    toast.success("Note deleted successfully.");
  };

  const voteForNotes = async () => {
    if (memberVoteCount < MAX_RETRO_VOTES_ALLOWED) {
      await notesService.updateRetroVote(
        { retroId: params.retroId, noteId: note.id, memberId: storedMember.id },
        { vote: parseInt(memberVote) + 1 }
      );
    }
  };

  const totalVotes = Object.values(note.members || {}).reduce(
    (acc, curr) => acc + curr.vote,
    0
  );

  const RenderTileActions = () => {
    switch (retroState.stage) {
      case RETRO_STATES.Vote:
        return (
          <BaseButton
            theme="TRANSPARENT"
            disabled={memberVoteCount >= MAX_RETRO_VOTES_ALLOWED}
            onClick={voteForNotes}
            title={
              memberVoteCount < MAX_RETRO_VOTES_ALLOWED
                ? "Vote"
                : `0 remaining votes`
            }
          >
            <div className="flex gap-2 items-center">
              <span
                className={`text-xs ${
                  memberVoteCount < MAX_RETRO_VOTES_ALLOWED
                    ? "text-zinc-300"
                    : "text-zinc-500"
                }`}
              >
                {totalVotes}
              </span>
              <HandThumbUpIcon
                className={`flex h-4 w-4 ${
                  memberVoteCount < MAX_RETRO_VOTES_ALLOWED
                    ? "text-zinc-300"
                    : "text-zinc-500"
                }`}
              ></HandThumbUpIcon>
            </div>
          </BaseButton>
        );
      case RETRO_STATES.Discuss:
        return (
          <div className="flex gap-2 items-center">
            <span className="text-xs text-zinc-500">{totalVotes}</span>
            <HandThumbUpIcon className="flex h-4 w-4 text-xs text-zinc-500"></HandThumbUpIcon>
          </div>
        );
      default:
        return (
          isMemberCreator && (
            <>
              <div className="child flex gap-1">
                <BaseButton theme="TRANSPARENT" onClick={editDescriptionModal}>
                  <BaseIcon
                    className="flex h-4 w-4 text-zinc-200 hover:text-zinc-100"
                    iconName={ICONS.Edit}
                  ></BaseIcon>
                </BaseButton>

                <BaseConfirm
                  theme="DANGER"
                  confirmTitle="Delete Note"
                  confirmText="Are you sure? you want to delete this note."
                  onConfirm={deleteNote}
                >
                  <BaseButton theme="TRANSPARENT">
                    <BaseIcon
                      className="flex h-4 w-4 text-zinc-200 hover:text-zinc-100"
                      iconName={ICONS.Delete}
                    ></BaseIcon>
                  </BaseButton>
                </BaseConfirm>
              </div>
            </>
          )
        );
    }
  };

  return (
    <>
      {isEditMode ? (
        <div className="flex rounded-md border border-zinc-700 bg-zinc-800 ">
          <div
            className={`flex-none w-2 ${descriptionClasses()} rounded-tl-md rounded-bl-md`}
          ></div>
          <div className="grow">
            <form className="w-full px-3 py-2 bg-zinc-800">
              <BaseTextarea
                name="editedDescription"
                value={editedDescription}
                onChange={handleChange}
                className={`w-full bg-zinc-800 rounded-sm text-zinc-200 outline-none`}
              ></BaseTextarea>

              <div className="flex justify-end gap-2 p-1">
                <BaseButton theme="TRANSPARENT" onClick={closeEditDescription}>
                  <BaseIcon
                    iconName={ICONS.Close}
                    className="flex h-5 w-5 text-zinc-200"
                  ></BaseIcon>
                </BaseButton>

                <BaseButton
                  theme="PRIMARY"
                  radius="rounded-full"
                  size="S"
                  onClick={handleSubmit}
                >
                  Save
                </BaseButton>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="flex justify-between rounded-md border border-zinc-700 bg-zinc-800">
          <div
            className={`flex-none ${descriptionClasses()} rounded-tl-md rounded-bl-md w-1.5`}
          ></div>
          <div className="flex flex-col gap-y-3 px-3 py-2 w-full parent relative">
            <p className="text-zinc-300">{note.description}</p>
            <div className="flex justify-between items-center gap-2">
              <div className="flex gap-1 items-center min-h-[26px]">
                <BaseFirstChar word={note?.createdBy}></BaseFirstChar>
                <p className="text-zinc-200 text-xs">{note.createdBy}</p>
              </div>
              <RenderTileActions></RenderTileActions>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
