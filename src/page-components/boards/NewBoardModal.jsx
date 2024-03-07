import { useEffect, useState } from "react";
import BaseIcon from "@/components/BaseIcon";
import { ICONS } from "@/helpers/constant";
import boardService from "@/services/board.service";
import { useNavigate } from "react-router-dom";
import { buildQRImage } from "@/helpers/constant";
import { useRef } from "react";
import { toast } from "react-toastify";
export default function NewBoardModal(props) {
  const { children } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [boardModel, setBoardModel] = useState({
    boardName: "",
    createdBy: "",
    createdDate: new Date().toDateString(),
  });

  const [newBoardId, setNewBoardId] = useState("");
  const [url, setUrl] = useState("");

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
      if (newBoard && newBoard.id) {
        console.log(newBoard);
        console.log("boardId", newBoardId);
        setNewBoardId(newBoard.id);
        toast.success(
          `${boardModel.createdBy} your board is created Successfully !!`
        );
        setUrl(`${window.location.origin}/boards/${newBoard.id}`);
      }
      // navigate(`/boards/${newBoard.id}`);
      // closeModal();
    } catch (e) {
      console.log(e);
    }
  };
  console.log("url", boardModel);

  const handleInputChange = (event) => {
    setUrl(event.target.value);
  };

  const navigateTOBoardPage = () => {
    navigate(`/boards/${newBoardId}`);
  };

  const inputRef = useRef(null);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success(`url Copied !!`);
  };

  return (
    <>
      <div onClick={openModal}>{children}</div>
      {isOpen && (
        <form onSubmit={handleSave}>
          <div
            className="relative z-10 "
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
          >
            <div className="fixed inset-0 bg-gradient-to-b from-slate-600 to-slate-850 bg-opacity-70 backdrop-blur-sm transition-opacity"></div>
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <div className="relative transform overflow-hidden rounded-lg bg-white text-left  transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  {newBoardId ? (
                    <div className="flex gap-5 flex-col justify-center p-8 bg-zinc-950  text-white relative">
                      <button
                        onClick={closeModal}
                        className="absolute right-6 top-5"
                      >
                        <BaseIcon
                          iconName={ICONS.Close}
                          className="flex text-zinc-300 h-6 w-6"
                        ></BaseIcon>
                      </button>
                      <h1 className="text-zinc-300 text-xl text-center">
                        Share Board
                      </h1>
                      <div className="flex gap-2 justify-center">
                        <input
                          type="text"
                          name=""
                          disabled
                          onChange={handleInputChange}
                          value={url}
                          ref={inputRef}
                          className="bg-zinc-900 border-zinc-700 border rounded-sm py-1 px-3 w-full"
                        />
                        <button
                          type="button"
                          onClick={() => copyToClipboard(url)}
                          className="px-4 py-1 items-center border border-zinc-600 text-zinc-950  bg-zinc-300 hover:bg-neutral-200"
                        >
                          COPY
                        </button>
                      </div>
                      <span className="text-center text-zinc-300">OR</span>
                      <h2 className="text-center text-zinc-300">
                        People can also join with QR Code:
                      </h2>

                      <img
                        src={buildQRImage(url)}
                        alt=""
                        className="w-32 m-auto"
                      />
                      <h2 className="text-center text-zinc-300">
                        Everyone with this URL will be able to access the board.
                      </h2>
                      <button
                        onClick={navigateTOBoardPage}
                        className="px-4 py-2 w-40 m-auto border border-zinc-600 text-zinc-950  bg-zinc-300 hover:bg-neutral-200"
                      >
                        Go To Board
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-5 flex-col justify-center p-8 bg-zinc-950  text-white">
                      <div className="flex justify-between items-center mb-2 p-8">
                        <div className="flex gap-2 items-center">
                          <BaseIcon
                            iconName={ICONS.rocket}
                            className=" flex w-6 h-6 text-indigo-500"
                          ></BaseIcon>
                          <h1 className="text-2xl text-slate-200">
                            Open <b className=" text-gray-400">Retro</b>
                          </h1>
                        </div>
                        <h1 className="text-sm text-right text-slate-200 ">
                          {boardModel.createdDate}
                        </h1>
                      </div>

                      <div className="flex flex-col gap-y-1 px-8">
                        <div className="flex gap-1">
                          <label htmlFor="" className="text-zinc-300">
                            Board Name*
                          </label>
                        </div>
                        <input
                          type="text"
                          name="boardName"
                          required
                          value={boardModel.boardName}
                          className="bg-zinc-900 border-zinc-700 border rounded-sm py-2 px-3"
                          onChange={handleChange}
                        />
                      </div>
                      <div className="flex flex-col gap-y-1 px-8">
                        <div className="flex gap-1">
                          <label htmlFor="" className="text-zinc-300">
                            Created By*
                          </label>
                        </div>
                        <input
                          type="text"
                          name="createdBy"
                          required
                          value={boardModel.createdBy}
                          className="bg-zinc-900 border-zinc-700 border rounded-sm py-2 px-3"
                          onChange={handleChange}
                        />
                      </div>
                      <div className="flex gap-4 items-center justify-end px-8 mt-4 text-white">
                        <button
                          type="button"
                          onClick={closeModal}
                          className="px-6 py-2"
                        >
                          Cancel
                        </button>

                        <button
                          type="submit"
                          className="px-6 py-2 items-center border border-zinc-600 text-zinc-950 bg-neutral-50 hover:bg-neutral-200"
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </form>
      )}
    </>
  );
}
