import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logCreateCardAnalytics, logSignUpAnalytics } from "@/firebase";
import BaseIcon from "@/components/BaseIcon";
import BaseButton from "@/components/BaseButton";
import BaseModal from "@/components/BaseModal";
import BaseInput from "@/components/form-inputs/BaseInput";
import { ICONS } from "@/helpers/constant";
import boardService from "@/services/board.service";
import memberService from "@/services/member.service";
import { setBoardMemberLocalStorage } from "@/utils/common.util";

export default function CreateBoardModal(props) {
  const navigate = useNavigate();
  const [isCreatBoardModalOpen, setIsCreatBoardModalOpen] = useState(false);
  const [boardModel, setBoardModel] = useState(initBoardModel());

  function initBoardModel() {
    const currentDate = new Date();
    return {
      boardName: "",
      createdBy: "",
      createdDate: currentDate.getTime(),
      createdDateUI: currentDate.toDateString(),
    };
  }

  const openCreateBoardModal = () => {
    logCreateCardAnalytics();
    setIsCreatBoardModalOpen(true);
  };

  const handleChange = (event) => {
    event.preventDefault();

    const { name, value } = event.target;

    setBoardModel({
      ...boardModel,
      [name]: value,
    });
  };

  const handleCreateBoard = async () => {
    const newBoard = await boardService.createBoard(boardModel);
    if (newBoard && newBoard.id) {
      logSignUpAnalytics();
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
      navigate(`/boards/${newBoard.id}/retros?share=true`);
    }
  };

  return (
    <>
      <BaseButton
        radius="rounded-none"
        theme="PRIMARY"
        size="2XL"
        onClick={openCreateBoardModal}
      >
        <div className="flex justify-center items-center gap-2">
          <BaseIcon
            iconName={ICONS.Plus}
            className="flex h-6 w-6 text-zinc-800"
          ></BaseIcon>
          <div className="text-lg text-zinc-800">Create Board ✨</div>
        </div>
      </BaseButton>
      <BaseModal
        isOpen={isCreatBoardModalOpen}
        setIsOpen={setIsCreatBoardModalOpen}
      >
        <div className="flex flex-col justify-center p-6 md:p-8 bg-zinc-900 text-white">
          <div className="flex justify-center mb-6 relative">
            <h4 className="text-zinc-200 text-xl text-center">Create Board</h4>
            <BaseButton
              theme="TRANSPARENT"
              className="absolute right-0 p-1"
              onClick={() => {
                setIsCreatBoardModalOpen(false);
              }}
            >
              <BaseIcon
                iconName={ICONS.Close}
                className="flex text-zinc-200 hover:text-zinc-100 h-6 w-6"
              ></BaseIcon>
            </BaseButton>
          </div>

          <form className="flex flex-col gap-y-4 px-8">
            <BaseInput
              labelName="Date"
              name="createdDate"
              required
              disabled
              defaultValue={boardModel.createdDateUI}
            ></BaseInput>

            <BaseInput
              labelName="Board Name*"
              name="boardName"
              required
              value={boardModel.boardName}
              onChange={handleChange}
            ></BaseInput>

            <BaseInput
              labelName="Created By*"
              name="createdBy"
              required
              value={boardModel.createdBy}
              onChange={handleChange}
            ></BaseInput>

            <div className="flex gap-4 items-center justify-end mt-4">
              <BaseButton
                theme="PRIMARY"
                size="XL"
                radius="rounded-full"
                onClick={handleCreateBoard}
              >
                Create
              </BaseButton>
            </div>
          </form>
        </div>
      </BaseModal>
    </>
  );
}
