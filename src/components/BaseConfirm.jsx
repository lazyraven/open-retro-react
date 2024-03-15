import { useState, Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { TrashIcon } from "@heroicons/react/24/outline";
import BaseModal from "@/components/BaseModal";

export default function BaseConfirm({
  children,
  confirmText,
  confirmTitle,
  onConfirm,
}) {
  let [isOpen, setIsOpen] = useState(false);
  const cancelButtonRef = useRef(null);
  function confirm() {
    setIsOpen(false);
    onConfirm();
  }

  return (
    <>
      <div
        onClick={() => {
          setIsOpen(true);
        }}
      >
        {children}
      </div>
      <BaseModal isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className="px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
          <div className="sm:flex sm:items-start">
            <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
              <TrashIcon className="h-5 w-5 text-red-600" aria-hidden="true" />
            </div>
            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
              <Dialog.Title
                as="h3"
                className="text-base font-semibold leading-6 text-zinc-100"
              >
                {confirmTitle || "Confirm"}
              </Dialog.Title>
              <div className="mt-2">
                <p className="text-sm text-zinc-200">
                  {confirmText || "Are you sure you want to proceed?"}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
          <button
            type="button"
            className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
            onClick={confirm}
          >
            Delete
          </button>
          <button
            type="button"
            className="mt-3 inline-flex w-full justify-center rounded-md bg-zinc-100 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
            onClick={() => setIsOpen(false)}
            ref={cancelButtonRef}
          >
            Cancel
          </button>
        </div>
      </BaseModal>
    </>
  );
}
