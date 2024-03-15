import { useState, useRef, useEffect } from "react";
import BaseModal from "@/components/BaseModal";
import BaseIcon from "@/components/BaseIcon";
import { ICONS } from "@/helpers/constant";
import { toast } from "react-toastify";
import { buildQRImage } from "@/helpers/constant";
import BaseButton from "@/components/BaseButton";
import BaseAlert from "@/components/BaseAlert";
import { EnvelopeOpenIcon } from "@heroicons/react/24/solid";
import { useSearchParams } from "react-router-dom";

export default function ShareBoardModal({ boardRetroUrl, board }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isOpen, setIsOpen] = useState(!!searchParams.get("share"));
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const emailInputRef = useRef(null);

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

  const showShareModal = () => {
    setIsOpen(true);
  };

  const closeShareModal = () => {
    setSearchParams({});
    setIsOpen(false);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success(`URL copied!`);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      to: email,
      boardUrl: boardRetroUrl,
      originUrl: window.location.origin,
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
      toast.success(`A mail has been sent successfully to ${email}`);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        emailInputRef.current?.focus();
      });
    }
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        onClick={showShareModal}
        className="flex gap-1 items-center px-3 py-1 border border-blue-500  text-blue-500 rounded-md bg-zinc-900 shadow-2xl"
      >
        <BaseIcon
          iconName={ICONS.ArrowUpOnSquare}
          className="flex h-5 w-5 text-blue-500"
        ></BaseIcon>
        Share
      </button>
      <BaseModal isOpen={isOpen} setIsOpen={closeShareModal}>
        <div className="flex gap-y-6 flex-col justify-center p-6 md:p-8 bg-zinc-900  text-zinc-50">
          <div className="flex flex-col gap-y-1">
            <div className="flex justify-center mb-6 relative">
              <h4 className="text-zinc-200 text-xl text-center">Share Board</h4>
              <button
                onClick={closeShareModal}
                className="absolute right-0 p-1"
              >
                <BaseIcon
                  iconName={ICONS.Close}
                  className="flex text-zinc-200 h-6 w-6"
                ></BaseIcon>
              </button>
            </div>
            <div className="flex flex-col gap-y-3">
              <div className="flex items-stretch w-full gap-2 justify-center">
                <input
                  type="text"
                  disabled
                  value={boardRetroUrl}
                  className="bg-zinc-800 grow border-zinc-700 border rounded-sm py-1.5 px-3 text-zinc-400"
                />
                <BaseButton
                  theme="SECONDARY"
                  type="button"
                  onClick={() => copyToClipboard(boardRetroUrl)}
                >
                  Copy
                </BaseButton>
              </div>
              <span className="text-center text-zinc-200">OR</span>
              <h2 className="text-center text-zinc-200">
                People can also join with QR Code:
              </h2>

              <img
                src={buildQRImage(boardRetroUrl)}
                alt=""
                className="w-32 m-auto"
              />
            </div>
          </div>

          <div className="flex flex-col px-4 py-6 border rounded-xl border-zinc-700 bg-blue-50">
            <h3 className="text-center text-xl text-zinc-800 font-semibold mb-3">
              Hi {board.createdBy} 👋
            </h3>

            <BaseAlert
              alertIcon={
                <EnvelopeOpenIcon className="h-6 w-6 text-blue-500"></EnvelopeOpenIcon>
              }
              type="INFO"
              title="Email Board Link"
              text="Bookmark or save the board link somewhere. We also encourage you to email it to yourself."
            ></BaseAlert>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-y-4 px-3"
            >
              <div className="flex flex-col gap-y-1 w-full">
                <label htmlFor="" className="text-zinc-800 font-semibold">
                  Email
                </label>
                <input
                  type="email"
                  ref={emailInputRef}
                  value={email}
                  onChange={handleEmailChange}
                  required
                  placeholder="example@gmail.com"
                  className=" border-zinc-300 border rounded-sm py-1.5 px-3 w-full text-zinc-800"
                />
              </div>
              {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={!isValidEmail}
                  className="px-5 py-2 rounded-full font-semibold text-zinc-50 bg-zinc-800 hover:bg-zinc-700"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </BaseModal>
    </>
  );
}
