import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import boardService from "@/services/board.service";
import BaseIcon from "@/components/BaseIcon";
import { ICONS } from "@/helpers/constant";

export default function NewNotes(props) {
  // const { notes } = props;
  const params = useParams();

  let inputClsName = "";
  let buttonClsName = "";
  const [notesModel, setNotesModel] = useState({
    // createdBy: "",
    createdDate: new Date().toDateString(),
    description: "",
    tagName: "",
  });
  const [isOpenTextbox, setisOpenTextbox] = useState(false);
  const handleChange = (event) => {
    // event.preventDefault();
    const { name, value } = event.target;
    setNotesModel({
      ...notesModel,
      [name]: value,
    });
  };

  const getInputClasses = () => {
    inputClsName =
      // props.tagName === "went-well"
      //   ? "border-[#009886]"
      //   : props.tagName === "action-item"
      //   ? "border-[#A63EB9]"
      //   : props.tagName === "to-improve"
      //   ? "border-[#E92C64]"
      //   : "border-[#009886]";

      props.tagName === "went-well"
        ? "bg-[#009886]"
        : props.tagName === "action-item"
        ? "bg-[#A63EB9]"
        : props.tagName === "to-improve"
        ? "bg-[#E92C64]"
        : null;
    return inputClsName;
  };

  // const getButtonClass = () => {
  //   buttonClsName =
  //     props.tagName === "went-well"
  //       ? "bg-[#009886] hover:bg-emerald-700"
  //       : props.tagName === "action-item"
  //       ? "bg-[#A63EB9] hover:bg-fuchsia-800"
  //       : props.tagName === "to-improve"
  //       ? "bg-[#E92C64] hover:bg-red-700"
  //       : "border-[#009886]";

  //   return buttonClsName;
  // };

  const handleSubmit = async (e, tagOption) => {
    notesModel.tagName = tagOption;
    e.preventDefault();
    try {
      await boardService.createNote(
        { boardId: params.boardId, retroId: params.retroId },
        notesModel
      );
      setisOpenTextbox(false);
      setNotesModel("");
      props.getRetroNotes();
    } catch (e) {
      console.log(e);
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
          className="flex justify-center bg-slate-100 hover:bg-slate-200 py-2 rounded-sm w-full"
          onClick={(event) => {
            addRetroDescription(event);
          }}
        >
          <BaseIcon
            iconName={ICONS.Plus}
            className=" h-4 w-4 text-gray-500"
          ></BaseIcon>
        </button>
      )}

      {isOpenTextbox && (
        <div className="flex border border-slate-700 rounded-md">
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
                className={`py-2 px-2 w-full resize-none text-sm rounded-sm text-slate-200 outline-none bg-transparent`}
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
                    className=" flex h-3 w-3 text-zinc-300"
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
