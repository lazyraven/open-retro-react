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

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const newBoard = await boardService.createBoard(boardModel);
      if (newBoard && newBoard.id) {
        setNewBoardId(newBoard.id);
        toast.success(
          `${boardModel.createdBy} your board is created Successfully !!`
        );
        setUrl(`${window.location.origin}/boards/${newBoard.id}`);
      }
    } catch (e) {
      console.log(e);
    }
  };

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
        <div
          className="relative z-10 "
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="fixed inset-0 bg-zinc-700 bg-opacity-70 backdrop-blur-sm transition-opacity"></div>
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div className="relative transform overflow-hidden rounded-lg bg-white text-left  transition-all sm:my-8 sm:w-full sm:max-w-lg">
                {newBoardId ? (
                  <div className="flex gap-5 flex-col justify-center p-8 bg-zinc-900  text-white relative">
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
                        className="px-4 py-1 items-center border border-zinc-600 text-zinc-950  bg-zinc-300 hover:bg-zinc-200"
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
                      className="px-4 py-2 w-40 m-auto border border-zinc-600 text-zinc-950  bg-zinc-300 hover:bg-zinc-200"
                    >
                      Go To Board
                    </button>
                  </div>
                ) : (
                  <div className="justify-center p-8 bg-zinc-900  text-white">
                    <div className="flex justify-center mb-4">
                      <h6 className="text-2xl text-zinc-200">Create Board</h6>
                    </div>
                    <form
                      onSubmit={handleSave}
                      className="flex flex-col gap-y-4 px-8"
                    >
                      <div className="flex flex-col gap-y-1">
                        <div className="flex gap-1">
                          <label className="text-zinc-300">Date</label>
                        </div>
                        <input
                          type="text"
                          name="boardName"
                          required
                          disabled
                          value={boardModel.createdDate}
                          className="bg-zinc-800 border-zinc-700 border rounded-sm py-1.5 px-3 text-zinc-400"
                          onChange={handleChange}
                        />
                      </div>

                      <div className="flex flex-col gap-y-1">
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
                          className="bg-zinc-900 border-zinc-700 border rounded-sm py-1.5 px-3"
                          onChange={handleChange}
                        />
                      </div>
                      <div className="flex flex-col gap-y-1">
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
                          className="bg-zinc-900 border-zinc-700 border rounded-sm py-1.5 px-3"
                          onChange={handleChange}
                        />
                      </div>
                      <div className="flex gap-4 items-center justify-end mt-4">
                        <button
                          type="button"
                          onClick={closeModal}
                          className="px-4 py-1 rounded-sm text-white"
                        >
                          Cancel
                        </button>

                        <button
                          type="submit"
                          className="px-4 py-1 rounded-sm text-zinc-900 bg-zinc-100 hover:bg-zinc-200"
                        >
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
