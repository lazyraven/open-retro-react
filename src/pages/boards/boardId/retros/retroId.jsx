import { useEffect, useState } from "react";
import BaseIcon from "@/components/BaseIcon";
import { ICONS } from "@/helpers/constant";
import boardService from "@/services/board.service";
import { useParams } from "react-router-dom";

export default function RetroId() {
  const [notes, setNotes] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenWentWell, setisOpenWentWell] = useState(false);
  const [isOpenToImprove, setIsOpenToImprove] = useState(false);
  const [isOpenActionItem, setisOpenActionItem] = useState(false);

  const params = useParams();

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

  const addRetroDescription = (tagName) => {
    tagName == "went-well"
      ? setisOpenWentWell(true)
      : tagName == "to-improve"
      ? setIsOpenToImprove(true)
      : tagName == "action-item"
      ? setisOpenActionItem(true)
      : "";
  };

  const toggleMenu = (tagName) => {
    tagName == "went-well"
      ? setisOpenWentWell(!isOpenWentWell)
      : tagName == "to-improve"
      ? setIsOpenToImprove(!isOpenToImprove)
      : tagName == "action-item"
      ? setisOpenActionItem(!isOpenActionItem)
      : "";
    // setisOpenWentWell(!isOpenWentWell);
  };

  const handleChange = (event) => {
    // event.preventDefault();
    const { name, value } = event.target;
    setNotesModel({
      ...notesModel,
      [name]: value,
    });
  };

  const handleSave = async (tagName) => {
    notesModel.tag = tagName;
    // e.preventDefault();
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

  // for list rendering
  const renderBoardRow = (note) => {
    switch (note.tag) {
      case "went-well":
        return (
          <div className="bg-[#009886] px-4 py-1  flex flex-col  w-full justify-between rounded-sm text-white">
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
          <div className="bg-[#E92C64] px-4 py-1   flex flex-col justify-between rounded-sm text-white">
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
          <div className="bg-[#A63EB9] px-4 py-1   flex flex-col justify-between rounded-sm text-white">
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

  // description modal box
  return (
    <div>
      <div className="grid grid-cols-3 px-5 py-5 gap-5 bg-[#F1F2F5]">
        <div className="flex justify-between py-2">
          <div>
            <div className="flex">
              <h1 className="font-semibold text-xl capitalize">Went-Well</h1>
              <BaseIcon
                iconName={ICONS.ellipsisvertical}
                className=" flex h-5 w-5 text-gray-400"
              ></BaseIcon>
            </div>
            <button
              type="button"
              className="flex justify-center bg-[#E5E6EB] hover:bg-slate-200 py-3 rounded-sm w-full"
              onClick={() => {
                addRetroDescription("went-well");
              }}
            >
              <BaseIcon
                iconName={ICONS.Plus}
                className=" h-4 w-4 text-gray-500"
              ></BaseIcon>
            </button>
            {isOpenWentWell && (
              <div className="flex gap-2">
                <form className="relative w-full">
                  <input
                    type="text"
                    id="went-well"
                    name="description"
                    value={notesModel.description}
                    onChange={handleChange}
                    className="border-4 py-1 px-2 w-full h-16 border-[#009886] rounded-sm outline-none"
                  />

                  <button
                    type="submit"
                    className="flex justify-center absolute right-2 bottom-2 text-white items-center bg-[#009886] hover:bg-emerald-700 font-semibold rounded-sm border-blue-100 text-sm px-1"
                    onClick={() => {
                      handleSave("went-well");
                    }}
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      toggleMenu("went-well");
                    }}
                    className="absolute right-2 top-2"
                  >
                    <BaseIcon
                      iconName={ICONS.Close}
                      className=" flex h-4 w-4 text-gray-500"
                    ></BaseIcon>
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-between py-2">
          <div>
            <div className="flex">
              <h1 className="font-semibold text-xl capitalize">Action-Item</h1>
              <BaseIcon
                iconName={ICONS.ellipsisvertical}
                className=" flex h-5 w-5 text-gray-400"
              ></BaseIcon>
            </div>
            <button
              type="button"
              className="flex justify-center bg-[#E5E6EB] hover:bg-slate-200 py-3 rounded-sm w-full"
              onClick={() => {
                addRetroDescription("action-item");
              }}
            >
              <BaseIcon
                iconName={ICONS.Plus}
                className=" h-4 w-4 text-gray-500"
              ></BaseIcon>
            </button>

            {isOpenActionItem && (
              <div className="flex gap-2 relative">
                <input
                  type="text"
                  id="action-item"
                  name="description"
                  className="border-4 py-1 px-2 w-full h-16 border-[#A63EB9] rounded-sm outline-none"
                  value={notesModel.description}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="flex justify-center absolute right-2 bottom-2 text-white items-center bg-[#A63EB9] font-semibold hover:bg-fuchsia-800 rounded-sm border-blue-100 text-sm px-1"
                  onClick={() => {
                    handleSave("action-item");
                  }}
                >
                  Save
                </button>
                <button
                  className="absolute right-2 top-2"
                  onClick={() => {
                    toggleMenu("action-item");
                  }}
                >
                  <BaseIcon
                    iconName={ICONS.Close}
                    className=" flex h-4 w-4 text-gray-500"
                  ></BaseIcon>
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-between py-2">
          <div>
            <div className="flex">
              <h1 className="font-semibold text-xl capitalize">To-Improve</h1>
              <BaseIcon
                iconName={ICONS.ellipsisvertical}
                className=" flex h-5 w-5 text-gray-400"
              ></BaseIcon>
            </div>
            <button
              type="button"
              className="flex justify-center bg-[#E5E6EB] hover:bg-slate-200 py-3 rounded-sm w-full"
              onClick={() => {
                addRetroDescription("to-improve");
              }}
            >
              <BaseIcon
                iconName={ICONS.Plus}
                className=" h-4 w-4 text-gray-500"
              ></BaseIcon>
            </button>

            {isOpenToImprove && (
              <div className="flex gap-2 relative">
                <input
                  type="text"
                  id="to-improve"
                  name="description"
                  className="border-4 py-1 px-2 w-full h-16 border-[#E92C64] rounded-sm outline-none"
                  value={notesModel.description}
                  onChange={handleChange}
                />

                <button
                  type="button"
                  className="flex justify-center absolute right-2 bottom-2 text-white items-center bg-[#E92C64] hover:bg-red-700 font-semibold rounded-sm border-blue-100 text-sm px-1"
                  onClick={() => {
                    handleSave("to-improve");
                  }}
                >
                  Save
                </button>
                <button
                  className="absolute right-2 top-2"
                  onClick={() => {
                    toggleMenu("to-improve");
                  }}
                >
                  <BaseIcon
                    iconName={ICONS.Close}
                    className=" flex h-4 w-4 text-gray-500"
                  ></BaseIcon>
                </button>
              </div>
            )}
          </div>
        </div>
        {notes.map((note, index) => {
          return (
            <div className="flex flex-col gap-3" key={note.tag + index}>
              <div>{renderBoardRow(note)}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
