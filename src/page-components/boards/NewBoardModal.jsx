import { useEffect, useState } from "react";
import BaseIcon from "@/components/BaseIcon";
import { ICONS } from "@/helpers/constant";
import boardService from "@/services/board.service";
import { useNavigate } from "react-router-dom";

export default function NewBoardModal(props) {
  const { children } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [boardModel, setBoardModel] = useState({
    boardName: "",
    createdBy: "",
    createdDate: new Date().toDateString(),
  });
  const navigate = useNavigate();

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleChange = (event) => {
    event.preventDefault();

    const { name, value } = event.target;

    setBoardModel({
      ...boardModel,
      [name]: value,
    });
  };

  useEffect(() => {});

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const newBoard = await boardService.createBoard(boardModel);
      navigate(`/boards/${newBoard.id}`);
      closeModal();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div onClick={openModal}>{children}</div>
      {isOpen && (
        <form onSubmit={handleSave}>
          <div
            className="relative z-10"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="flex gap-8 flex-col justify-center px-4 pb-4 sm:p-6 sm:pb-4 bg-black text-white">
                    <div className="flex gap-2 justify-center items-center">
                      <BaseIcon
                        iconName={ICONS.rocket}
                        className=" flex w-5 h-5 text-blue-500"
                      ></BaseIcon>{" "}
                      <h1 className="text-xl">
                        Open <b className=" text-gray-500">Retro</b>
                      </h1>
                    </div>
                    <div className="flex gap-2 justify-center items-center">
                      <div className="flex-1">
                        <label htmlFor="" className="font-semibold">
                          {" "}
                          Name
                          <span className="text-red-500 text-lg">*</span> :
                        </label>
                      </div>
                      <input
                        type="text"
                        name="boardName"
                        value={boardModel.boardName}
                        className="grow border-2 py-1 px-2 border-gray-300 rounded-sm"
                        onChange={handleChange}
                      />
                      {/* <div>
                        <span className="text-red-400 text-sm">
                          Please fill all the required fields.
                        </span>
                      </div> */}
                    </div>
                    <div className="flex gap-2 justify-center items-center">
                      <div className="flex-1">
                        <label htmlFor="" className="font-semibold">
                          {" "}
                          Created By
                          <span className="text-red-500 text-lg">*</span> :
                        </label>
                      </div>
                      <input
                        type="text"
                        name="createdBy"
                        value={boardModel.createdBy}
                        className="grow border-2 py-1 px-2 border-gray-300 rounded-sm"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="flex gap-2 justify-end text-white">
                      <button
                        type="button"
                        onClick={closeModal}
                        className="py-1 px-3 rounded-sm bg-[#f51766] hover:bg-[#d55884]"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="py-1 px-3 rounded-sm bg-[#00ac6a] hover:bg-[#4cc798]"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      )}
    </>
  );
}
