import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import notesService from "@/services/notes.service";
import BaseIcon from "@/components/BaseIcon";
import { ICONS } from "@/helpers/constant";
import { toast } from "react-toastify";
import { getLocalStorage } from "@/utils/common.util";

export default function NewNotes(props) {
  const params = useParams();
  const [notesModel, setNotesModel] = useState(initNewNotesModel());
  const [isOpenTextbox, setisOpenTextbox] = useState(false);

  const handleChange = (event) => {
    // event.preventDefault();
    const { name, value } = event.target;
    setNotesModel({
      ...notesModel,
      [name]: value,
    });
  };

  function initNewNotesModel() {
    return {
      createdBy: getLocalStorage("member")?.name || "",
      createdDate: new Date().toDateString(),
      description: "",
      tagName: "",
    };
  }

  const getInputClasses = () => {
    const { tagName } = props;
    switch (tagName) {
      case "went-well":
        return "bg-teal-600";
      case "to-improve":
        return "bg-pink-600";
      case "action-item":
        return "bg-fuchsia-600";
    }
  };

  const handleSubmit = async (e, tagOption) => {
    notesModel.tagName = tagOption;
    e.preventDefault();
    try {
      await notesService.createRetroNotes(
        { boardId: params.boardId, retroId: params.retroId },
        notesModel
      );
      setisOpenTextbox(false);
      setNotesModel(initNewNotesModel());
    } catch (e) {
      toast.error(`Error occurred, ${e.message}`);
    }
  };

  const addRetroDescription = (e) => {
    e.preventDefault();
    setisOpenTextbox(true);
  };

  const toggleMenu = (e) => {
    e.preventDefault();
    setisOpenTextbox(false);
  };

  useEffect(() => {});

  return (
    <div className="flex flex-col gap-3">
      {!isOpenTextbox && (
        <button
          type="button"
          className="flex justify-center bg-zinc-100 hover:bg-zinc-200 py-2 rounded-sm w-full"
          onClick={(event) => {
            addRetroDescription(event);
          }}
        >
          <BaseIcon
            iconName={ICONS.Plus}
            className=" h-4 w-4 text-zinc-500"
          ></BaseIcon>
        </button>
      )}

      {isOpenTextbox && (
        <div className="flex border border-zinc-700 rounded-md">
          <div
            className={`flex-none w-2 ${getInputClasses()} rounded-tl-md rounded-bl-md`}
          ></div>
          <div className="grow">
            <form
              onSubmit={(event) => {
                handleSubmit(event, props.tagName);
              }}
              className=" w-full"
            >
              <textarea
                type="text"
                name="description"
                value={notesModel.description}
                onChange={handleChange}
                placeholder="Type something..."
                rows="2"
                cols="7"
                className={`py-2 px-2 w-full resize-none text-sm rounded-sm text-zinc-200 outline-none bg-transparent`}
              />

              <div className="flex justify-end gap-2 px-2 py-1">
                <button
                  type="submit"
                  className={`flex justify-center text-zinc-200 items-center rounded-sm  bg-zinc-700 hover:bg-zinc-400 text-xs px-1`}
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={(event) => {
                    toggleMenu(event);
                  }}
                  className=" top-2"
                >
                  <BaseIcon
                    iconName={ICONS.Close}
                    className=" flex h-4 w-4 text-zinc-300"
                  ></BaseIcon>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
