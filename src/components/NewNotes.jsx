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
    boardId: params.boardId,
    retroId: params.retroId,
    createdBy: "",
    createdDate: new Date().toDateString(),
    description: "",
    tag: "",
    title: "",
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
      props.tagName === "went-well"
        ? "border-[#009886]"
        : props.tagName === "action-item"
        ? "border-[#A63EB9]"
        : props.tagName === "to-improve"
        ? "border-[#E92C64]"
        : "border-[#009886]";
    console.log("classes", inputClsName);
    return inputClsName;
  };

  const getButtonClass = () => {
    buttonClsName =
      props.tagName === "went-well"
        ? "bg-[#009886] hover:bg-emerald-700"
        : props.tagName === "action-item"
        ? "bg-[#A63EB9] hover:bg-fuchsia-800"
        : props.tagName === "to-improve"
        ? "bg-[#E92C64] hover:bg-red-700"
        : "border-[#009886]";
    return buttonClsName;
  };

  const handleSubmit = async (e, tagOption) => {
    notesModel.tag = tagOption;
    e.preventDefault();
    try {
      const newNotes = await boardService.createNotes(notesModel);
      console.log(newNotes);

      // console.log("props", props);
      setisOpenTextbox(false);
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
      <button
        type="button"
        className="flex justify-center bg-[#E5E6EB] hover:bg-slate-200 py-2 rounded-sm w-full"
        onClick={(event) => {
          addRetroDescription(event);
        }}
      >
        <BaseIcon
          iconName={ICONS.Plus}
          className=" h-4 w-4 text-gray-500"
        ></BaseIcon>
      </button>
      {isOpenTextbox && (
        <form
          onSubmit={(event) => {
            handleSubmit(event, props.tagName);
          }}
          className="relative w-full"
        >
          <textarea
            type="text"
            name="description"
            value={notesModel.description}
            onChange={handleChange}
            placeholder="Type something..."
            rows="2"
            cols="7"
            className={`border-[3.5px] py-1 px-2 w-full resize-none text-sm rounded-sm outline-none ${getInputClasses()}`}
          />

          <div className="absolute right-2 bottom-3 mt-1  flex gap-2">
            <button
              type="button"
              onClick={(event) => {
                toggleMenu(event);
              }}
              className=" top-2"
            >
              <BaseIcon
                iconName={ICONS.Close}
                className=" flex h-3 w-3 text-gray-600"
              ></BaseIcon>
            </button>
            <button
              type="submit"
              className={`flex justify-center  bottom-3 text-white items-center rounded-sm border-blue-100 text-xs px-1 ${getButtonClass()}`}
            >
              Save
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
