import { useEffect, useState } from "react";
import BaseIcon from "@/components/BaseIcon";
import { ICONS } from "@/helpers/constant";
import boardService from "@/services/board.service";
import { useParams } from "react-router-dom";

export default function RetroId() {
  const [notes, setNotes] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const params = useParams();
  console.log("params called", params);

  const [notesModel, setNotesModel] = useState({
    boardId: params.boardId,
    retroId: params.retroId,
    createdBy: "",
    createdDate: "",
    description: "",
    tag: "",
    title: "",
  });

  const getNotes = async () => {
    try {
      const notes = await boardService.getNotes({
        retroId: params.retroId,
        // retroId: params.OpenRetroId,
      });
      setNotes(notes);
    } catch (e) {
      console.log(e);
    }
  };

  const addRetroDescription = () => {
    setIsOpen(true);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleChange = (event) => {
    event.preventDefault();

    const { name, value } = event.target;

    setNotesModel({
      ...notesModel,
      [name]: value,
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const newNotes = await boardService.createNotes(notesModel);
      console.log(newNotes);
      // navigate(`/${newRetroId}`);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getNotes({ retroId: params.OpenRetroId });
  }, []);

  const renderBoardRow = (note) => {
    switch (note.tag) {
      case "went-well":
        return (
          <div className="bg-[#009886] px-4 py-1 h-16 flex flex-col  w-full justify-between rounded-sm text-white">
            <div className="flex justify-between">
              <h1 className="font-semibold">{note.description}</h1>
              <button type="button">
                <BaseIcon
                  iconName={ICONS.ellipsisvertical}
                  className=" flex h-5 w-5 text-gray-200"
                ></BaseIcon>
              </button>
            </div>
            <div className="flex gap-1 justify-end">
              <button type="button" className="flex gap-1">
                <BaseIcon
                  iconName={ICONS.LikeThumb}
                  className="flex h-5 w-5"
                ></BaseIcon>
                <p className="text-sm font-semibold">0</p>
              </button>
              <button type="button" className="flex gap-1">
                <BaseIcon
                  iconName={ICONS.Comment}
                  className="flex h-5 w-5"
                ></BaseIcon>
                <p className="text-sm font-semibold">0</p>
              </button>
            </div>
          </div>
        );
      case "to-improve":
        return (
          <div className="bg-[#E92C64] px-4 py-1 h-16  flex flex-col justify-between rounded-sm text-white">
            <div className="flex justify-between">
              <h1 className="font-semibold">{note.description}</h1>
              <button type="button">
                <BaseIcon
                  iconName={ICONS.ellipsisvertical}
                  className=" flex h-5 w-5 text-gray-200"
                ></BaseIcon>
              </button>
            </div>
            <div className="flex gap-1 justify-end">
              <button type="button" className="flex gap-1">
                <BaseIcon
                  iconName={ICONS.LikeThumb}
                  className="flex h-5 w-5"
                ></BaseIcon>
                <p className="text-sm font-semibold">0</p>
              </button>
              <button type="button" className="flex gap-1">
                <BaseIcon
                  iconName={ICONS.Comment}
                  className="flex h-5 w-5"
                ></BaseIcon>
                <p className="text-sm font-semibold">0</p>
              </button>
            </div>
          </div>
        );
      case "action-item":
        return (
          <div className="bg-[#A63EB9] px-4 py-1 h-16  flex flex-col justify-between rounded-sm text-white">
            <div className="flex justify-between">
              <h1 className="font-semibold">{note.description}</h1>
              <button type="button">
                <BaseIcon
                  iconName={ICONS.ellipsisvertical}
                  className=" flex h-5 w-5 text-gray-200"
                ></BaseIcon>
              </button>
            </div>
            <div className="flex gap-1 justify-end">
              <button type="button" className="flex gap-1">
                <BaseIcon
                  iconName={ICONS.LikeThumb}
                  className="flex h-5 w-5"
                ></BaseIcon>
                <p className="text-sm font-semibold">0</p>
              </button>
              <button type="button" className="flex gap-1">
                <BaseIcon
                  iconName={ICONS.Comment}
                  className="flex h-5 w-5"
                ></BaseIcon>
                <p className="text-sm font-semibold">0</p>
              </button>
            </div>
          </div>
        );
    }
  };

  const renderTextBox = (note) => {
    switch (note.tag) {
      case "went-well":
        return (
          <div className="flex gap-2 relative">
            <input
              type="text"
              name="description"
              value={note.description}
              className="border-4 py-1 px-2 w-full h-16 border-[#009886] rounded-sm outline-none"
              onChange={handleChange}
            />

            <button
              type="button"
              className="flex justify-center absolute right-2 bottom-2 text-white items-center bg-[#009886] hover:bg-emerald-700 font-semibold rounded-sm border-blue-100 text-sm px-1"
              onClick={handleSave}
            >
              Save
            </button>
            <button
              type="button"
              onClick={toggleMenu}
              className="absolute right-2 top-2"
            >
              <BaseIcon
                iconName={ICONS.Close}
                className=" flex h-4 w-4 text-gray-500"
              ></BaseIcon>
            </button>
          </div>
        );
      case "to-improve":
        return (
          <div className="flex gap-2 relative">
            <input
              type="text"
              name="boardName"
              className="border-4 py-1 px-2 w-full h-16 border-[#E92C64] rounded-sm outline-none"
            />

            <button
              type="button"
              className="flex justify-center absolute right-2 bottom-2 text-white items-center bg-[#E92C64] hover:bg-red-700 font-semibold rounded-sm border-blue-100 text-sm px-1"
              onClick={() => {
                addRetroDescription();
              }}
            >
              Save
            </button>
            <button className="absolute right-2 top-2" onClick={toggleMenu}>
              <BaseIcon
                iconName={ICONS.Close}
                className=" flex h-4 w-4 text-gray-500"
              ></BaseIcon>
            </button>
          </div>
        );
      case "action-item":
        return (
          <div className="flex gap-2 relative">
            <input
              type="text"
              name="boardName"
              className="border-4 py-1 px-2 w-full h-16 border-[#A63EB9] rounded-sm outline-none"
            />

            <button
              type="button"
              className="flex justify-center absolute right-2 bottom-2 text-white items-center bg-[#A63EB9] font-semibold hover:bg-fuchsia-800 rounded-sm border-blue-100 text-sm px-1"
              onClick={() => {
                addRetroDescription();
              }}
            >
              Save
            </button>
            <button className="absolute right-2 top-2" onClick={toggleMenu}>
              <BaseIcon
                iconName={ICONS.Close}
                className=" flex h-4 w-4 text-gray-500"
              ></BaseIcon>
            </button>
          </div>
        );
    }
  };
  return (
    <div>
      <div className="grid grid-cols-3 px-5 py-5 gap-5 bg-[#F1F2F5]">
        {notes.map((note, index) => {
          return (
            <div className="flex flex-col gap-3" key={note.tag + index}>
              <div className="flex justify-between py-2">
                <h1 className="font-semibold text-xl capitalize">{note.tag}</h1>
                <button type="button">
                  <BaseIcon
                    iconName={ICONS.ellipsisvertical}
                    className=" flex h-5 w-5 text-gray-400"
                  ></BaseIcon>
                </button>
              </div>
              <button
                type="button"
                className="flex justify-center bg-[#E5E6EB] hover:bg-slate-200 py-3 rounded-sm"
                onClick={() => {
                  addRetroDescription();
                }}
              >
                <BaseIcon
                  iconName={ICONS.Plus}
                  className=" h-4 w-4 text-gray-500"
                ></BaseIcon>
              </button>
              {isOpen && <div>{renderTextBox(note)}</div>}
              <div>{renderBoardRow(note)}</div>
            </div>
          );
        })}
        {/* <div className="flex flex-col gap-3">
          <div className="flex justify-between py-2">
            <h1 className="font-semibold text-lg">Went Well</h1>
            <button type="button">
              <BaseIcon
                iconName={ICONS.ellipsisvertical}
                className=" flex h-5 w-5 text-gray-400"
              ></BaseIcon>
            </button>
          </div>
          <button
            type="button"
            className="flex justify-center bg-[#E5E6EB] py-2 rounded-sm"
          >
            <BaseIcon
              iconName={ICONS.Plus}
              className=" h-4 w-4 text-gray-500"
            ></BaseIcon>
          </button>
          <div className="bg-teal-600 px-4 py-1 h-16  flex flex-auto justify-between rounded-sm text-white">
            <h1 className="font-semibold">I released code to production</h1>
            <button type="button">
              <BaseIcon
                iconName={ICONS.ellipsisvertical}
                className=" flex h-5 w-5 text-gray-200"
              ></BaseIcon>
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex justify-between py-2">
            <h1 className="font-semibold text-lg">To Improve</h1>
            <button type="button">
              <BaseIcon
                iconName={ICONS.ellipsisvertical}
                className=" flex h-5 w-5 text-gray-400"
              ></BaseIcon>
            </button>
          </div>
          <button
            type="button"
            className="flex justify-center bg-[#E5E6EB] py-2 rounded-sm"
          >
            <BaseIcon
              iconName={ICONS.Plus}
              className=" h-4 w-4 text-gray-500"
            ></BaseIcon>
          </button>
          <div className="bg-rose-600 px-4 py-1 h-16  flex flex-auto justify-between rounded-sm text-white">
            <h1 className="font-semibold">
              Need to improve testing, bug found
            </h1>
            <button type="button">
              <BaseIcon
                iconName={ICONS.ellipsisvertical}
                className=" flex h-5 w-5 text-gray-200"
              ></BaseIcon>
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex justify-between py-2">
            <h1 className="font-semibold text-lg">Action Items</h1>
            <button type="button">
              <BaseIcon
                iconName={ICONS.ellipsisvertical}
                className=" flex h-5 w-5 text-gray-400"
              ></BaseIcon>
            </button>
          </div>
          <button
            type="button"
            className="flex justify-center bg-[#E5E6EB] py-2 rounded-sm"
          >
            <BaseIcon
              iconName={ICONS.Plus}
              className=" h-4 w-4 text-gray-500"
            ></BaseIcon>
          </button>
          <div className="bg-fuchsia-600 px-4 py-1 h-16  flex flex-auto justify-between rounded-sm text-white">
            <h1 className="font-semibold">
              We finished 10 stories. some more details{" "}
            </h1>
            <button type="button">
              <BaseIcon
                iconName={ICONS.ellipsisvertical}
                className=" flex h-5 w-5 text-gray-200"
              ></BaseIcon>
            </button>
          </div>
        </div> */}
      </div>
    </div>
  );
}
