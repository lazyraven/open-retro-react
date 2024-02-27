import { useEffect, useState } from "react";
import BaseIcon from "@/components/BaseIcon";
import { ICONS } from "@/helpers/constant";
import boardService from "@/services/board.service";
import { useParams } from "react-router-dom";

export default function BaseForm(props) {
  const { children } = props;
  const [isOpen, setIsOpen] = useState(false);
  const params = useParams();
  const [retroModel, setRetroModel] = useState({
    retroName: "",
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
            <div className="fixed inset-0 bg-gradient-to-b from-slate-600 bg-opacity-75 backdrop-blur-sm transition-opacity"></div>
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-gradient-to-b from-slate-800 to-slate-950 flex gap-8 flex-col justify-center px-4 pb-4  sm:p-6 sm:pb-4">
                    <div className="flex gap-2 justify-center items-center">
                      <BaseIcon
                        iconName={ICONS.rocket}
                        className=" flex w-5 h-5 text-blue-500"
                      ></BaseIcon>{" "}
                      <h1 className="text-2xl text-slate-200">
                        Open <b className=" text-gray-400">Retro</b>
                      </h1>
                    </div>
                    <div className="flex gap-5 justify-center items-center">
                      <label htmlFor="" className="font-semibold">
                        Retro Name :
                      </label>
                      <input
                        type="text"
                        name="retroName"
                        required
                        value={retroModel.retroName}
                        className="border-2 py-1 px-2 border-gray-500 bg-transparent  rounded-sm"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="flex gap-2 justify-end">
                      <button
                        type="button"
                        onClick={closeModal}
                        className=" hover:bg-red-700 py-1 px-3 text-red-500 hover:text-white rounded-sm"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className=" py-1 px-3  text-black bg-stone-100 hover:bg-stone-300 rounded-sm"
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
