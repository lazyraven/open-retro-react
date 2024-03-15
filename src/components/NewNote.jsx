import { useParams } from "react-router-dom";
import { useState } from "react";
import notesService from "@/services/notes.service";
import { toast } from "react-toastify";
import { getBoardMemberLocalStorage } from "@/utils/common.util";
import BaseButton from "@/components/BaseButton";
import BaseTextarea from "@/components/form-inputs/BaseTextarea";

export default function NewNote(props) {
  const params = useParams();
  const { boardId } = props;
  const storedMember = getBoardMemberLocalStorage({ boardId });
  const [notesModel, setNotesModel] = useState(initNewNotesModel());
  const [isInputActive, setIsInputActive] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNotesModel({
      ...notesModel,
      [name]: value,
    });
  };

  function initNewNotesModel() {
    return {
      createdById: storedMember.id,
      createdBy: storedMember?.name || "",
      createdDate: new Date().getTime(),
      description: "",
      tagName: "",
    };
  }

  // const getInputClasses = () => {
  //   const { tagName } = props;
  //   switch (tagName) {
  //     case "went-well":
  //       return "bg-teal-600";
  //     case "to-improve":
  //       return "bg-pink-600";
  //     case "action-item":
  //       return "bg-fuchsia-600";
  //   }
  // };

  const handleSubmit = async (e, tagOption) => {
    notesModel.tagName = tagOption;
    e.preventDefault();
    try {
      await notesService.createRetroNotes(
        { boardId, retroId: params.retroId },
        notesModel
      );
      setIsInputActive(false);
      setNotesModel(initNewNotesModel());
    } catch (e) {
      toast.error(`Error occurred, ${e.message}`);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex border border-zinc-700 rounded-md">
        {/* <div
          className={`flex-none w-2 ${getInputClasses()} rounded-tl-md rounded-bl-md`}
        ></div> */}
        <div className="grow">
          <form
            onSubmit={(event) => {
              handleSubmit(event, props.tagName);
            }}
            className="w-full p-1 bg-zinc-800"
          >
            <BaseTextarea
              name="description"
              value={notesModel.description}
              onChange={handleChange}
              onClick={() => {
                setIsInputActive(true);
              }}
              onBlur={() => {
                setIsInputActive(!!notesModel.description);
              }}
              placeholder="Type note..."
              className={`p-2 w-full bg-zinc-800 rounded-sm text-zinc-200 outline-none`}
            ></BaseTextarea>
            {isInputActive && (
              <div className="flex justify-end gap-2 p-1">
                <BaseButton
                  theme="PRIMARY"
                  type="submit"
                  radius="rounded-full"
                  size="S"
                >
                  Save
                </BaseButton>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
