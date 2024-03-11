export default function BaseFirstChar(props) {
  const { word, size } = props;

  let classes = "";
  switch (size) {
    case "XL":
      classes = "h-7 w-7";
      break;

    case "L":
      classes = "h-6 w-6 text-sm";
      break;

    case "M":
      classes = "h-5 w-5 text-xs";
      break;

    default:
      classes = "h-5 w-5 text-xs";
  }

  return (
    <span
      className={`flex items-center justify-center bg-zinc-500 rounded-full  text-white ${classes}`}
    >
      {word && typeof word === "string" && word.trim().charAt(0).toUpperCase()}
    </span>
  );
}
