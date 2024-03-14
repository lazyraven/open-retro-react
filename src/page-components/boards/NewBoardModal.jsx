import { useState } from "react";
import BaseIcon from "@/components/BaseIcon";
import { ICONS } from "@/helpers/constant";
import boardService from "@/services/board.service";
import { useNavigate } from "react-router-dom";
import { buildQRImage } from "@/helpers/constant";
import { toast } from "react-toastify";
import memberService from "@/services/member.service";
import { setBoardMemberLocalStorage } from "@/utils/common.util";
import BaseButton from "@/components/BaseButton";
import { logCreateCardAnalytics, logSignUpAnalytics } from "@/firebase";

export default function NewBoardModal(props) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [boardModel, setBoardModel] = useState(initBoardModel());
  const [newBoardId, setNewBoardId] = useState("");
  const [boardRetroUrl, setBoardRetroUrl] = useState("");

  function initBoardModel() {
    return {
      boardName: "",
      createdBy: "",
      createdDate: new Date().toDateString(),
    };
  }

  const openModal = () => {
    logCreateCardAnalytics();
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
        logSignUpAnalytics();
        setNewBoardId(newBoard.id);
        const addMemberResult = await memberService.addMember(
          { boardId: newBoard.id },
          { name: boardModel.createdBy }
        );
        setBoardMemberLocalStorage({
          boardId: newBoard.id,
          member: addMemberResult,
        });
        const boardUpdate = await boardService.updateBoardOwner(
          { boardId: newBoard.id },
          { owner: addMemberResult.id }
        );
        toast.success(
          `${boardModel.createdBy} your board is created Successfully !!`
        );
        setBoardRetroUrl(
          `${window.location.origin}/boards/${newBoard.id}/retros`
        );
      }
    } catch (e) {
      toast.error(e.message);
    }
  };

  const navigateToBoardRetro = () => {
    navigate(`/boards/${newBoardId}/retros`);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success(`URL copied!`);
  };

  return (
    <>
      <BaseButton
        radius="rounded-none"
        theme="PRIMARY"
        size="XL"
        onClick={openModal}
      >
        <div className="flex justify-center items-center gap-2">
          <BaseIcon
            iconName={ICONS.Plus}
            className="flex h-5 w-5 text-zinc-800"
          ></BaseIcon>
          <div className="text-lg text-zinc-800">Create Board</div>
        </div>
      </BaseButton>
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
                        disabled
                        value={boardRetroUrl}
                        className="bg-zinc-800 grow border-zinc-700 border rounded-sm py-1.5 px-3 text-zinc-400"
                      />
                      <BaseButton
                        theme="SECONDARY"
                        type="button"
                        onClick={() => copyToClipboard(boardRetroUrl)}
                      >
                        COPY
                      </BaseButton>
                    </div>
                    <span className="text-center text-zinc-300">OR</span>
                    <h2 className="text-center text-zinc-300">
                      People can also join with QR Code:
                    </h2>

                    <img
                      src={buildQRImage(boardRetroUrl)}
                      alt=""
                      className="w-32 m-auto"
                    />
                    <div className="flex justify-center mt-3">
                      <BaseButton
                        theme="PRIMARY"
                        type="button"
                        size="XL"
                        onClick={navigateToBoardRetro}
                      >
                        Go To Board
                      </BaseButton>
                    </div>
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
                          className="bg-zinc-800 border-zinc-700 border rounded-sm py-1.5 px-3"
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
                          className="bg-zinc-800 border-zinc-700 border rounded-sm py-1.5 px-3"
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
