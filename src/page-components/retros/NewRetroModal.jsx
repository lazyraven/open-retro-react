import { useState, useEffect, useRef } from "react";
import BaseIcon from "@/components/BaseIcon";
import { ICONS } from "@/helpers/constant";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import BaseButton from "@/components/BaseButton";
import BaseInput from "@/components/form-inputs/BaseInput";
import BaseModal from "@/components/BaseModal";
import retroService from "@/services/retro.service";

export default function BaseForm(props) {
  const { children } = props;
  const [isOpen, setIsOpen] = useState(false);
  const retroNameInputRef = useRef(null);

  const params = useParams();
  const today = new Date().toDateString();
  const [retroModel, setRetroModel] = useState({
    retroName: `Retro ${today.slice(4, today.length)}`,
    createdDate: new Date().getTime(),
    retroState: "write",
  });

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;

    setRetroModel({
      ...retroModel,
      [name]: value,
    });
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        console.log(`retroNameInputRef calle`);
        retroNameInputRef.current?.focus();
      });
    }
  }, [isOpen]);

  const handleSave = async () => {
    await retroService.createRetro({ boardId: params.boardId }, retroModel);
    closeModal();
    props.getBoardRetros();
    toast.success("Retro created successfully.");
  };

  return (
    <>
      <div onClick={openModal}>{children}</div>
      <BaseModal isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className="flex flex-col gap-y-3 justify-center p-4 md:p-6 bg-zinc-900  text-zinc-50">
          <div className="flex justify-center mb-6 relative">
            <h4 className="text-zinc-200 text-xl text-center">
              Create New Retro
            </h4>
            <BaseButton
              theme="TRANSPARENT"
              className="absolute right-0 p-1"
              onClick={() => {
                closeModal();
              }}
            >
              <BaseIcon
                iconName={ICONS.Close}
                className="flex text-zinc-200 hover:text-zinc-100 h-6 w-6"
              ></BaseIcon>
            </BaseButton>
          </div>

          <form className="flex flex-col gap-y-4 px-3 md:px-6 w-full">
            <BaseInput
              ref={retroNameInputRef}
              labelName="Retro Name*"
              name="retroName"
              required
              defaultValue={retroModel.retroName}
              onChange={handleChange}
            ></BaseInput>

            <div className="flex gap-4 items-center justify-end mt-4">
              <BaseButton
                type="button"
                theme="PRIMARY"
                size="XL"
                radius="rounded-full"
                disabled={!retroModel.retroName}
                onClick={handleSave}
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
