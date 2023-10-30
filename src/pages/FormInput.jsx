import { useEffect, useRef, useState } from "react";
import { firestore } from "../firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";
import BaseIcon from "../components/BaseIcon";
import { ICONS } from "../helpers/constant";

export default function BaseForm(props) {
  const { children } = props;
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  const nameRef = useRef();

  const getRetros = async () => {
    try {
      // addDoc(ref, data);
      const querySnapshot = await getDocs(collection(firestore, "retros"));
      console.log(`querySnapshot`);
      console.log(querySnapshot);

      querySnapshot.forEach((doc) => {
        console.log("doc", doc);
        console.log(`${doc.id} =>`);
        console.log(doc.data());
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getRetros();
  });

  const handleSave = async (e) => {
    e.preventDefault();
    console.log("e", e);
    let data = {
      name: nameRef.current.value,
    };
    console.log("data", data);
    try {
      // addDoc(messageCollection, data);
    } catch (e) {
      console.log(e);
    }
  };

  const cancelEvent = (e) => {
    console.log("event", e);
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
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-neutral-100 flex gap-8 flex-col justify-center px-4 pb-4  sm:p-6 sm:pb-4">
                    <div className="flex gap-2 justify-center items-center">
                      <BaseIcon
                        iconName={ICONS.rocket}
                        className=" flex w-5 h-5 text-blue-500"
                      ></BaseIcon>{" "}
                      <h1 className="text-xl">
                        Open <b className=" text-gray-500">Retro</b>
                      </h1>
                    </div>
                    <div className="flex gap-2 justify-center items-center">
                      <label htmlFor="" className="font-semibold">
                        {" "}
                        Name :
                      </label>
                      <input
                        type="text"
                        className="border-2 py-1 px-2 border-gray-300 rounded-sm"
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
                        type="button"
                        onClick={() => {
                          closeModal();
                        }}
                        className="hover:text-white hover:bg-blue-500 py-1 px-3 text-blue-500 rounded-sm"
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
