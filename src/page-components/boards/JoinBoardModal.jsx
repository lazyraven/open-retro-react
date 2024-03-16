import { useState, useRef, useEffect } from "react";
import memberService from "@/services/member.service";
import BaseButton from "@/components/BaseButton";
import BaseModal from "@/components/BaseModal";
import BaseInput from "@/components/form-inputs/BaseInput";
import { setBoardMemberLocalStorage } from "@/utils/common.util";
import { toast } from "react-toastify";

export default function JoinBoardModal({ board }) {
  const [isOpen, setIsOpen] = useState(true);
  const memberNameInputRef = useRef(null);

  const [memberModel, setMemberModel] = useState({
    name: "",
  });

  const handleMemberFormSubmit = async (event) => {
    try {
      event.preventDefault();
      const addMemberResult = await memberService.addMember(
        { boardId: board.id },
        memberModel
      );

      setBoardMemberLocalStorage({
        boardId: board.id,
        member: addMemberResult,
      });
      setIsOpen(false);
      location.reload(true);
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

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        memberNameInputRef.current?.focus();
      });
    }
  }, [isOpen]);

  return (
    <BaseModal isOpen={isOpen} setIsOpen={() => {}}>
      <div className="flex flex-col gap-y-3 justify-center p-4 md:p-6 bg-zinc-900 text-zinc-50">
        <div className="flex flex-col gap-y-1 justify-center items-center">
          <h3 className="text-2xl text-zinc-200">Hi 👋</h3>
          <p className="text-zinc-300 mt-3">
            Please enter your name to access.
          </p>
          <h6 className="text-xl text-zinc-100 mb-2">📋 {board.boardName}</h6>
        </div>
        <form
          onSubmit={handleMemberFormSubmit}
          className="flex flex-col gap-y-4 px-3 md:px-6 w-full"
        >
          <BaseInput
            ref={memberNameInputRef}
            labelName="Name*"
            name="name"
            required
            value={memberModel.name}
            onChange={handleMemberModelChange}
          ></BaseInput>

          <div className="flex gap-4 items-center justify-end mt-4">
            <BaseButton
              type="submit"
              theme="PRIMARY"
              size="XL"
              radius="rounded-full"
            >
              Submit
            </BaseButton>
          </div>
        </form>
      </div>
    </BaseModal>
  );
}
