import { useEffect, useState } from "react";
import BaseIcon from "@/components/BaseIcon";
import { ICONS } from "@/helpers/constant";
import boardService from "@/services/board.service";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function BaseForm(props) {
  const { children } = props;
  const [isOpen, setIsOpen] = useState(false);
  const params = useParams();
  const today = new Date().toDateString();
  const [retroModel, setRetroModel] = useState({
    retroName: `Retro ${today.slice(4, today.length)}`,
    createdDate: new Date().toDateString(),
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

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await boardService.createRetro({ boardId: params.boardId }, retroModel);
      closeModal();
      props.getBoardRetros();
      toast.success("Successfully retro created !!");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div onClick={openModal}>{children}</div>
      {isOpen && (
        <div
          className="relative z-10"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="fixed inset-0 bg-zinc-700 bg-opacity-70 backdrop-blur-sm transition-opacity"></div>
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div className="relative transform overflow-hidden rounded-lg bg-white text-left  transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="flex gap-5 flex-col justify-center p-8 bg-zinc-900  text-white">
                  <div className="flex gap-2 justify-center items-center">
                    <h6 className="text-2xl text-zinc-200">Create New Retro</h6>
                  </div>
                  <form
                    onSubmit={handleSave}
                    className="flex flex-col gap-y-4 px-8 mt-8 mb-4"
                  >
                    <div className="flex flex-col gap-y-1">
                      <label htmlFor="" className="text-zinc-300">
                        Retro Name*
                      </label>
                      <input
                        type="text"
                        name="retroName"
                        required
                        value={retroModel.retroName}
                        className="bg-zinc-900 border-zinc-700 border rounded-sm py-1.5 px-3"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="flex gap-3 items-center justify-end mt-4">
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
      )}
    </>
  );
}
