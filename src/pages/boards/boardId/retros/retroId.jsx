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

  const addRetroDescription = (tagName, note) => {
    notesModel.tag = tagName;

    switch (note.tag) {
      case "went-well":
        return setisOpenWentWell(true);
      case "to-improve":
        return setIsOpenToImprove(true);
      case "action-item":
        return setisOpenActionItem(true);
    }
  };

  const closeWentWell = () => {
    setisOpenWentWell(false);
  };
  const closeToImprove = () => {
    setIsOpenToImprove(false);
  };
  const closeActionItem = () => {
    setisOpenActionItem(false);
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

  // const renderTextBoxCopy = (note) => {
  // let isOpenWentWell = note.tag == "went-well" ? true : false;
  // let isOpenToImprove = note.tag == "to-improve" ? true : false;
  // let isOpenActionItem = note.tag == "action-item" ? true : false;
  // console.log("", isOpenWentWell, isOpenToImprove, isOpenActionItem);
  // };

  // for post new data
  // const renderTextBox = (note) => {
  //   switch (note.tag) {
  //     case "went-well":
  //       return (
  //         <div className="flex gap-2 ">
  //           <form onSubmit={handleSave} className="relative w-full">
  //             <input
  //               type="text"
  //               name="description"
  //               value={notesModel.description}
  //               onChange={handleChange}
  //               className="border-4 py-1 px-2 w-full h-16 border-[#009886] rounded-sm outline-none"
  //             />

  //             <button
  //               type="submit"
  //               className="flex justify-center absolute right-2 bottom-2 text-white items-center bg-[#009886] hover:bg-emerald-700 font-semibold rounded-sm border-blue-100 text-sm px-1"
  //             >
  //               Save
  //             </button>
  //             <button
  //               type="button"
  //               onClick={toggleMenu}
  //               className="absolute right-2 top-2"
  //             >
  //               <BaseIcon
  //                 iconName={ICONS.Close}
  //                 className=" flex h-4 w-4 text-gray-500"
  //               ></BaseIcon>
  //             </button>
  //           </form>
  //         </div>
  //       );
  //     case "to-improve":
  //       return (
  //         <>
  //           <div className="flex gap-2 relative">
  //             <input
  //               type="text"
  //               name="description"
  //               className="border-4 py-1 px-2 w-full h-16 border-[#E92C64] rounded-sm outline-none"
  //               value={notesModel.description}
  //               onChange={handleChange}
  //             />

  //             <button
  //               type="button"
  //               className="flex justify-center absolute right-2 bottom-2 text-white items-center bg-[#E92C64] hover:bg-red-700 font-semibold rounded-sm border-blue-100 text-sm px-1"
  //               onClick={handleSave}
  //             >
  //               Save
  //             </button>
  //             <button className="absolute right-2 top-2" onClick={toggleMenu}>
  //               <BaseIcon
  //                 iconName={ICONS.Close}
  //                 className=" flex h-4 w-4 text-gray-500"
  //               ></BaseIcon>
  //             </button>
  //           </div>
  //         </>
  //       );
  //     case "action-item":
  //       return (
  //         <>
  //           <div className="flex gap-2 relative">
  //             <input
  //               type="text"
  //               name="description"
  //               className="border-4 py-1 px-2 w-full h-16 border-[#A63EB9] rounded-sm outline-none"
  //               value={notesModel.description}
  //               onChange={handleChange}
  //             />
  //             <button
  //               type="button"
  //               className="flex justify-center absolute right-2 bottom-2 text-white items-center bg-[#A63EB9] font-semibold hover:bg-fuchsia-800 rounded-sm border-blue-100 text-sm px-1"
  //               onClick={handleSave}
  //             >
  //               Save
  //             </button>
  //             <button className="absolute right-2 top-2" onClick={toggleMenu}>
  //               <BaseIcon
  //                 iconName={ICONS.Close}
  //                 className=" flex h-4 w-4 text-gray-500"
  //               ></BaseIcon>
  //             </button>
  //           </div>
  //         </>
  //       );
  //   }
  // };

  // description modal box
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
                  addRetroDescription(note.tag, note);
                }}
              >
                <BaseIcon
                  iconName={ICONS.Plus}
                  className=" h-4 w-4 text-gray-500"
                ></BaseIcon>
              </button>
              {/* {isOpen && <div>{renderTextBox(note)}</div>} */}
              {/* {isOpenWentWell && <div>{renderTextBox(note)}</div>} */}

              {isOpenWentWell && note.tag == "went-well" ? (
                <div className="flex gap-2 ">
                  <form onSubmit={handleSave} className="relative w-full">
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
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        toggleMenu(note.tag);
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
              ) : isOpenToImprove && note.tag == "to-improve" ? (
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
                    onClick={handleSave}
                  >
                    Save
                  </button>
                  <button
                    className="absolute right-2 top-2"
                    onClick={() => {
                      toggleMenu(note.tag);
                    }}
                  >
                    <BaseIcon
                      iconName={ICONS.Close}
                      className=" flex h-4 w-4 text-gray-500"
                    ></BaseIcon>
                  </button>
                </div>
              ) : isOpenActionItem && note.tag == "action-item" ? (
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
                    onClick={handleSave}
                  >
                    Save
                  </button>
                  <button
                    className="absolute right-2 top-2"
                    onClick={() => {
                      toggleMenu(note.tag);
                    }}
                  >
                    <BaseIcon
                      iconName={ICONS.Close}
                      className=" flex h-4 w-4 text-gray-500"
                    ></BaseIcon>
                  </button>
                </div>
              ) : null}

              <div>{renderBoardRow(note)}</div>
            </div>
          );
        })}
      </div>
      aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
      <div className="grid grid-cols-3 px-5 py-5 gap-5 bg-[#F1F2F5]">
        <div>
          <div className="flex justify-between py-2">
            <h1 className="font-semibold text-xl capitalize">lakshya</h1>
            <button type="button">
              <BaseIcon
                iconName={ICONS.ellipsisvertical}
                className=" flex h-5 w-5 text-gray-400"
              ></BaseIcon>
            </button>
          </div>

          <div className="flex flex-col gap-3">
            <button
              type="button"
              className="flex justify-center bg-[#E5E6EB] hover:bg-slate-200 py-3 rounded-sm"
              // onClick={() => {
              //   addRetroDescription(note.tag, note);
              // }}
            >
              <BaseIcon
                iconName={ICONS.Plus}
                className=" h-4 w-4 text-gray-500"
              ></BaseIcon>
            </button>
          </div>

          {isOpenWentWell && (
            <div className="flex gap-2 ">
              <form onSubmit={handleSave} className="relative w-full">
                <input
                  type="text"
                  name="description"
                  value={notesModel.description}
                  onChange={handleChange}
                  className="border-4 py-1 px-2 w-full h-16 border-[#009886] rounded-sm outline-none"
                />

                <button
                  type="submit"
                  className="flex justify-center absolute right-2 bottom-2 text-white items-center bg-[#009886] hover:bg-emerald-700 font-semibold rounded-sm border-blue-100 text-sm px-1"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={closeWentWell}
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

        <div className="flex gap-2 relative">
          <input
            type="text"
            name="description"
            className="border-4 py-1 px-2 w-full h-16 border-[#E92C64] rounded-sm outline-none"
            value={notesModel.description}
            onChange={handleChange}
          />

          <button
            type="button"
            className="flex justify-center absolute right-2 bottom-2 text-white items-center bg-[#E92C64] hover:bg-red-700 font-semibold rounded-sm border-blue-100 text-sm px-1"
            onClick={handleSave}
          >
            Save
          </button>
          <button className="absolute right-2 top-2" onClick={closeToImprove}>
            <BaseIcon
              iconName={ICONS.Close}
              className=" flex h-4 w-4 text-gray-500"
            ></BaseIcon>
          </button>
        </div>

        <div className="flex gap-2 relative">
          <input
            type="text"
            name="description"
            className="border-4 py-1 px-2 w-full h-16 border-[#A63EB9] rounded-sm outline-none"
            value={notesModel.description}
            onChange={handleChange}
          />
          <button
            type="button"
            className="flex justify-center absolute right-2 bottom-2 text-white items-center bg-[#A63EB9] font-semibold hover:bg-fuchsia-800 rounded-sm border-blue-100 text-sm px-1"
            onClick={handleSave}
          >
            Save
          </button>
          <button className="absolute right-2 top-2" onClick={closeActionItem}>
            <BaseIcon
              iconName={ICONS.Close}
              className=" flex h-4 w-4 text-gray-500"
            ></BaseIcon>
          </button>
        </div>

        {/* <div>{renderBoardRow(note)}</div> */}
      </div>
    </div>
  );
}
