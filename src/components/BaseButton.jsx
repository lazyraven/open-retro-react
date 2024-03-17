import { useState } from "react";
import { toast } from "react-toastify";

export default function BaseButton(props) {
  const [loading, setLoading] = useState(false);
  const {
    theme,
    type,
    size,
    radius,
    children,
    className,
    onClick,
    disabled,
    ...restProps
  } = props;

  let classes = "";
  let spinnerClasses =
    "text-gray-300 animate-spin dark:text-gray-600 fill-blue-600";

  if (radius) {
    classes += ` ${radius}`;
  } else {
    classes += " rounded-md";
  }

  if (className) {
    classes = `${classes} ${className}`;
  }

  switch (theme) {
    case "DARK":
      classes +=
        " text-zinc-200 font-semibold text-zinc-50 bg-zinc-800 hover:bg-zinc-700 disabled:bg-zinc-500 disabled:text-zinc-300";
      break;
    case "TRANSPARENT":
      classes +=
        " text-zinc-200 bg-transparent hover:text-zinc-100 font-semibold";
      break;
    case "PRIMARY":
      classes += " text-zinc-900 bg-zinc-100 hover:bg-zinc-200 font-semibold";
      break;
    case "SECONDARY":
      classes +=
        " text-white border border-zinc-700 hover:bg-zinc-800 font-semibold";
      break;
    case "BLUE":
      classes += " text-white bg-blue-600 hover:bg-blue-500 font-semibold";
      break;
    case "DANGER":
      classes +=
        " text-red-700 border border-red-700 hover:border-red-600 hover:text-red-600 font-semibold";
      break;
    case "DANGER-SOLID":
      classes += " bg-red-600 hover:bg-red-500 text-zinc-50 font-semibold";
      break;
    default:
      classes += " text-white";
  }

  switch (size) {
    case "2XL":
      classes += " px-8 py-3";
      spinnerClasses += " w-6 h-6";
      break;
    case "XL":
      classes += " px-7 py-2";
      spinnerClasses += " w-6 h-6";
      break;
    case "L":
      classes += " px-6 py-1.5";
      spinnerClasses += " w-6 h-6";
      break;
    case "M":
      classes += " px-3 py-1.5 text-sm";
      spinnerClasses += " w-5 h-5";
      break;
    case "S":
      classes += " px-3 py-0.5 text-sm";
      spinnerClasses += " w-4 h-4";
      break;
    default:
      classes += " p-1";
      spinnerClasses += " w-4 h-4";
  }

  const onButtonClick = async (event) => {
    try {
      event.preventDefault();
      if (typeof onClick === "function") {
        setLoading(() => true);
        await onClick();
      }
    } catch (error) {
      toast.error(`Error occurred, ${error.message}`);
    } finally {
      setLoading(() => false);
    }
  };

  return (
    <button
      type={type || "button"}
      className={classes}
      disabled={disabled || loading}
      onClick={onButtonClick}
      {...restProps}
    >
      <div className="relative">
        {loading && (
          <div className="absolute flex items-center left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-10">
            <svg
              aria-hidden="true"
              className={spinnerClasses}
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          </div>
        )}
        <div className={loading ? "opacity-0" : "opacity-100"}>{children}</div>
      </div>
    </button>
  );
}
