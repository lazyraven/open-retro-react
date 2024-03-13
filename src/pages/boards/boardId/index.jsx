import { useEffect, useState, useContext } from "react";
import { Outlet, NavLink, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import BaseIcon from "@/components/BaseIcon";
import BaseButton from "@/components/BaseButton";
import { ICONS } from "@/helpers/constant";
import { buildQRImage } from "@/helpers/constant";
import memberService from "@/services/member.service";
import {
  getBoardMemberLocalStorage,
  setBoardMemberLocalStorage,
} from "@/utils/common.util";
import BoardContext from "@/contexts/BoardContext";
// import ExportBoard from "@/components/ExportBoard";

export default function BoardId() {
  const { board, reFetchBoard } = useContext(BoardContext);
  const [shareBoard, setShareBoard] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const storedMember = getBoardMemberLocalStorage({ boardId: board.id });
  const boardRetroUrl = `${window.location.origin}/boards/${board.id}/retros`;

  const [isOpen, setIsOpen] = useState(true);
  const params = useParams();

  const [memberModel, setMemberModel] = useState({
    name: "",
  });

  const tabs = [
    { name: "Retros", to: "retros" },
    { name: "Scrum Poker", to: "scrum-poker" },
    { name: "Reports", to: "reports" },
    { name: "Members", to: "members" },
  ];

  const getBoardRecord = async function () {
    try {
      await reFetchBoard({ boardId: params.boardId });
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getBoardRecord();
  }, []);

  const handelOpenShareModal = () => {
    setShareBoard(true);
  };

  const handelCloseShareModal = () => {
    setShareBoard(false);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success(`URL copied!`);
  };

  const handleMemberFormSubmit = async (event) => {
    try {
      event.preventDefault();
      const addMemberResult = await memberService.addMember(
        { boardId: params.boardId },
        memberModel
      );

      setBoardMemberLocalStorage({
        boardId: board.id,
        member: addMemberResult,
      });
      setIsOpen(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleMemberModelChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setMemberModel({
      ...memberModel,
      [name]: value,
    });
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  console.log("board", board);
  return (
    <>
      {isLoading ? (
        <div className="flex flex-col gap-2 justify-center items-center min-h-screen">
          <svg
            aria-hidden="true"
            className="inline w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <p className="text-white text-center">Loading...</p>
        </div>
      ) : (
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col gap-1 min-h-screen ">
            <div className="flex justify-between mt-2 items-center py-1 gap-3">
              <div className="flex flex-col gap-1">
                <h1 className="text-2xl text-zinc-200">📋{board.boardName}</h1>
                <h3 className="text-zinc-500">{board.createdBy}</h3>
              </div>
              <div className="flex  gap-2">
                {/* <ExportBoard board={board}></ExportBoard> */}
                <button
                  type="button"
                  onClick={handelOpenShareModal}
                  className="flex gap-1 items-center px-3 py-1 border border-blue-500  text-blue-500 rounded-md bg-zinc-900 shadow-2xl"
                >
                  <BaseIcon
                    iconName={ICONS.ArrowUpOnSquare}
                    className="flex h-5 w-5 text-blue-500"
                  ></BaseIcon>
                  Share
                </button>

                {shareBoard && (
                  <div
                    className="relative z-10"
                    aria-labelledby="modal-title"
                    role="dialog"
                    aria-modal="true"
                  >
                    <div className="fixed inset-0 bg-zinc-700 bg-opacity-70 backdrop-blur-sm transition-opacity"></div>
                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                      <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <div className="relative transform overflow-hidden rounded-lg bg-white text-left transition-all sm:my-8 sm:w-full sm:max-w-lg">
                          <div className="flex gap-5 flex-col justify-center p-8 bg-zinc-900  text-white relative">
                            <button
                              onClick={handelCloseShareModal}
                              className="absolute right-6 top-5"
                            >
                              <BaseIcon
                                iconName={ICONS.Close}
                                className="flex text-zinc-200 h-6 w-6"
                              ></BaseIcon>
                            </button>
                            <h4 className="text-zinc-200 text-xl text-center">
                              Share Board
                            </h4>
                            <div className="flex items-stretch w-full gap-2 justify-center">
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
                            <span className="text-center text-zinc-200">
                              OR
                            </span>
                            <h2 className="text-center text-zinc-200">
                              People can also join with QR Code:
                            </h2>

                            <img
                              src={buildQRImage(boardRetroUrl)}
                              alt=""
                              className="w-32 m-auto"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {storedMember?.name ? (
              <>
                <ul className="flex gap-3 border-b border-zinc-700 mb-4 overflow-auto">
                  {tabs.map((tab, index) => (
                    <li key={`tab-index-${index}`} className="flex">
                      <NavLink
                        to={tab.to}
                        className={({ isActive }) =>
                          isActive
                            ? "px-4 py-4 text-sm font-medium text-blue-500 whitespace-nowrap border-b border-blue-500"
                            : "px-4 py-4 text-sm text-zinc-200 whitespace-nowrap font-medium"
                        }
                      >
                        {tab.name}
                      </NavLink>
                    </li>
                  ))}
                </ul>
                <Outlet></Outlet>
              </>
            ) : (
              isOpen && (
                <div
                  className="relative z-10"
                  aria-labelledby="modal-title"
                  role="dialog"
                  aria-modal="true"
                >
                  <div className="fixed inset-0 bg-gradient-to-b from-zinc-600 bg-opacity-75 backdrop-blur-sm transition-opacity"></div>
                  <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                      <div className="relative transform overflow-hidden rounded-lg bg-white text-left  transition-all sm:my-8 sm:w-full sm:max-w-lg">
                        <div className="flex gap-5 flex-col justify-center p-8 bg-zinc-900  text-white">
                          <div className="flex flex-col gap-y-1 justify-center items-center">
                            <h3 className="text-2xl text-zinc-200">Hi 👋</h3>
                            <p className="text-zinc-300 mt-4">
                              Please enter your name to access.
                            </p>
                            <h6 className="text-2xl text-zinc-100">
                              📋 {board.boardName}
                            </h6>
                          </div>
                          <form
                            onSubmit={handleMemberFormSubmit}
                            className="flex flex-col gap-y-4 px-8"
                          >
                            <div className="flex flex-col gap-2">
                              <div className="">
                                <label htmlFor="" className="text-zinc-200">
                                  Name*
                                </label>
                              </div>
                              <input
                                type="text"
                                name="name"
                                required
                                value={memberModel.name}
                                onChange={handleMemberModelChange}
                                className="bg-zinc-800 border-zinc-700 border rounded-sm py-1.5 px-3"
                              />
                            </div>
                            <div className="flex gap-3 items-center justify-end mt-4 text-white">
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
                      </div>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      )}
    </>
  );
}
