import { useState, Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { TrashIcon, InformationCircleIcon } from "@heroicons/react/24/outline";
import BaseModal from "@/components/BaseModal";
import BaseButton from "@/components/BaseButton";

const ConfirmTypes = {
  Success: "SUCCESS",
  Danger: "DANGER",
  Info: "INFO",
  // warning: "WARNING",
  // bell: "BELL",
};

export default function BaseConfirm({
  theme,
  children,
  confirmText,
  confirmTitle,
  onConfirm,
  btnText,
}) {
  let [isOpen, setIsOpen] = useState(false);
  // const cancelButtonRef = useRef(null);

  let buttonTheme = "PRIMARY";

  switch (theme) {
    case ConfirmTypes.Info:
      buttonTheme = "INFO";
      break;
    case ConfirmTypes.Danger:
      buttonTheme = "DANGER-SOLID";
  }

  const Icon = () => {
    switch (theme) {
      case ConfirmTypes.Info:
        return (
          <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100 sm:mx-0 sm:h-10 sm:w-10">
            <InformationCircleIcon
              className="h-5 w-5 text-indigo-600"
              aria-hidden="true"
            />
          </div>
        );
      case ConfirmTypes.Danger:
        return (
          <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
            <TrashIcon className="h-5 w-5 text-red-600" aria-hidden="true" />
          </div>
        );
    }
  };

  async function confirm() {
    await onConfirm();
    setIsOpen(false);
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
            <Icon></Icon>
            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
              {confirmTitle && (
                <Dialog.Title
                  as="h3"
                  className="text-base font-semibold leading-6 text-zinc-100"
                >
                  {confirmTitle}
                </Dialog.Title>
              )}
              <p className="text-sm text-zinc-200">
                {confirmText || "Are you sure you want to proceed?"}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex sm:flex-row-reverse px-4 py-3 sm:px-6 gap-3">
          <BaseButton
            theme={buttonTheme}
            size="M"
            className="sm:w-auto w-full"
            radius="rounded-md"
            onClick={confirm}
          >
            {btnText || "Confirm"}
          </BaseButton>

          <BaseButton
            theme="PRIMARY"
            size="M"
            className="sm:w-auto w-full"
            radius="rounded-md"
            onClick={() => {
              setIsOpen(false);
            }}
          >
            Cancel
          </BaseButton>
        </div>
      </BaseModal>
    </>
  );
}
