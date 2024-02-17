import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import boardService from "@/services/board.service";
import BaseIcon from "@/components/BaseIcon";
import { ICONS } from "@/helpers/constant";

export default function NewNotes(props) {
  const params = useParams();

  let inputClsName = "";
  let buttonClsName = "";

  const [notesModel, setNotesModel] = useState({
    boardId: params.boardId,
    retroId: params.retroId,
    createdBy: "",
    createdDate: "",
    description: "",
    tag: "",
    title: "",
  });

  const toggleMenu = (event) => {
    console.log("toggleMenu called", event);
    // setInClose(false);
    // props.handleClose = false;
  };

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
    console.log("handleSubmit called", tagOption);
    notesModel.tag = tagOption;
    e.preventDefault();
    try {
      const newNotes = await boardService.createNotes(notesModel);
      console.log(newNotes);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {});

  return (
    <form
      onSubmit={(event) => {
        handleSubmit(event, props.tagName);
      }}
      className="relative w-full"
    >
      <input
        type="text"
        name="description"
        value={notesModel.description}
        onChange={handleChange}
        className={`border-4 py-1 px-2 w-full h-16 rounded-sm outline-none ${getInputClasses()}`}
      />

      <button
        type="submit"
        className={`flex justify-center absolute right-2 bottom-2 text-white items-centerfont-semibold rounded-sm border-blue-100 text-sm px-1 ${getButtonClass()}`}
      >
        Save
      </button>
      <button
        type="button"
        onClick={(event) => {
          toggleMenu(event, false);
        }}
        className="absolute right-2 top-2"
      >
        <BaseIcon
          iconName={ICONS.Close}
          className=" flex h-4 w-4 text-gray-500"
        ></BaseIcon>
      </button>
    </form>
  );
}
