import { useState } from "react";
import BaseButton from "@/components/BaseButton";
import { toast } from "react-toastify";

export default function ExportBoard(props) {
  const { board } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleEmailChange = (event) => {
    const inputEmail = event.target.value;
    setEmail(inputEmail);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValidEmail(emailRegex.test(inputEmail));
    if (!emailRegex.test(inputEmail)) {
      setErrorMessage("Please enter a valid email address");
    } else {
      setErrorMessage("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      to: email,
      boardUrl: `${window.location.origin}/boards/${board.id}`,
      originUrl: "https://www.openretro.in",
      createdBy: board.createdBy,
      boardName: board.boardName,
    };

    try {
      const response = await fetch(
        " https://api.justvegan.fit/mail/send-open-retro-welcome-mail",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to send email data");
      }
      setEmail("");
      toast.success(` Mail sent Successfully !!`);
      setIsOpen(false);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };
  return (
    <div>
      <BaseButton
        radius="rounded-none"
        theme="SECONDARY"
        size="XL"
        onClick={openModal}
      >
        Export Board
      </BaseButton>
      {isOpen && (
        <div
          className="relative z-10 "
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="fixed inset-0 bg-zinc-700 bg-opacity-70 backdrop-blur-sm transition-opacity"></div>
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div className="relative transform overflow-hidden rounded-lg bg-white text-left  transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="flex flex-col gap-y-6 p-8 bg-zinc-900  text-white">
                  <div className="flex justify-center ">
                    <p className="text-center text-blue-200">
                      If you fill the email then you export your board to your
                      mail address for storing your board ID. it is optional
                    </p>
                  </div>
                  <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-y-4 px-8"
                  >
                    <div className="flex flex-col gap-y-1">
                      <div className="flex gap-1">
                        <label htmlFor="" className="text-zinc-300">
                          Email
                        </label>
                      </div>
                      <input
                        type="email"
                        // name="boardName"
                        value={email}
                        onChange={handleEmailChange}
                        required
                        placeholder="example@gmail.com"
                        className="bg-zinc-900 border-zinc-700 border rounded-sm py-1.5 px-3"
                      />
                    </div>
                    {errorMessage && (
                      <p style={{ color: "red" }}>{errorMessage}</p>
                    )}

                    <div className="flex gap-4 items-center justify-end mt-4">
                      <button
                        type="button"
                        onClick={closeModal}
                        className="px-4 py-1 rounded-sm text-white"
                      >
                        Cancel
                      </button>

                      <button
                        type="submit"
                        disabled={!isValidEmail}
                        className="px-4 py-1 rounded-sm text-zinc-900 bg-zinc-100 hover:bg-zinc-200"
                      >
                        send
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
