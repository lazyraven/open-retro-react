import { useEffect, useState, useContext } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import BaseIcon from "@/components/BaseIcon";
import { ICONS } from "@/helpers/constant";
import { useRef } from "react";
import { buildQRImage } from "@/helpers/constant";
import memberService from "@/services/member.service";
import { toast } from "react-toastify";
import { getLocalStorage, setLocalStorage } from "@/utils/common.util";
import BoardContext from "@/contexts/BoardContext";

export default function BoardId() {
  const { board, reFetchBoard } = useContext(BoardContext);
  const [shareBoard, setShareBoard] = useState(false);
  const [url, setUrl] = useState("");
  const storedMember = getLocalStorage("member");
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
    }
  };

  useEffect(() => {
    getBoardRecord();
  }, []);

  const handelOpenShareModal = () => {
    setShareBoard(true);
    setUrl(`${window.location.origin}/boards/${board.id}`);
  };

  const handelCloseShareModal = () => {
    setShareBoard(false);
  };
  const handleInputChange = (event) => {
    setUrl(event.target.value);
    //
  };
  const inputRef = useRef(null);
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const handleMemberFormSubmit = async (event) => {
    try {
      event.preventDefault();
      const addMemberResult = await memberService.addMember(
        { boardId: params.boardId },
        memberModel
      );
      console.log(`addMemberResponse`, addMemberResult);
      setLocalStorage("member", addMemberResult);
      setIsOpen(false);
    } catch (error) {
      toast.error(error.msg);
    }
  };

  const handleMemberModelChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    console.log(`memberModel`);
    console.log(memberModel);

    setMemberModel({
      ...memberModel,
      [name]: value,
    });
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col gap-1 min-h-screen">
      <div className="flex justify-between mt-2 items-center py-1 gap-3">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl text-zinc-200">📋{board.boardName}</h1>
          <h3 className="text-zinc-500">{board.createdBy}</h3>
        </div>
        <div className="flex">
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
                      <h1 className="text-zinc-200 text-xl text-center">
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
                          className="px-4 py-1 text-zinc-900 bg-zinc-100 hover:bg-zinc-200"
                        >
                          COPY
                        </button>
                      </div>
                      <span className="text-center text-zinc-200">OR</span>
                      <h2 className="text-center text-zinc-200">
                        People can also join with QR Code:
                      </h2>

                      <img
                        src={buildQRImage(url)}
                        alt=""
                        className="w-32 m-auto"
                      />
                      <h2 className="text-center text-zinc-200">
                        Everyone with this URL will be able to access the board.
                      </h2>
                      {/* <button
                        // onClick={navigateTOBoardPage}
                        className="px-4 py-2 w-40 m-auto border border-zinc-600 text-zinc-950  bg-zinc-300 hover:bg-zinc-200"
                      >
                        Go To Board
                      </button> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* <Outlet></Outlet> */}
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
                    <div className="flex gap-2 justify-center items-center">
                      <BaseIcon
                        iconName={ICONS.rocket}
                        className="flex w-5 h-5 text-blue-500"
                      ></BaseIcon>{" "}
                      <h1 className="text-2xl text-zinc-200">
                        Open <b className=" text-zinc-400">Retro</b>
                      </h1>
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
                          className="bg-zinc-900 border-zinc-700 border rounded-sm py-1.5 px-3"
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
  );
}
