export default function BaseButton(props) {
  const { theme, size, radius, children, ...restProps } = props;
  let classes = radius ? radius : "rounded-sm";

  switch (theme) {
    case "PRIMARY":
      classes += " text-zinc-900 bg-zinc-100 hover:bg-zinc-200";
      break;
    case "SECONDARY":
      classes += " text-white border border-zinc-700";
      break;
    case "BLUE":
      classes += " text-white bg-blue-600";
      break;
    case "DANGER":
      classes += " text-red-700 border border-red-700";
      break;
    default:
      classes += " text-white";
  }

  switch (size) {
    case "XL":
      classes += " px-7 py-2";
      break;
    case "L":
      classes += " px-6 py-1.5";
      break;
    case "S":
      classes += " px-3 py-0.5";
      break;
    default:
      classes += " px-4 py-1";
  }

  return (
    <button type="button" className={classes} {...restProps}>
      {children}
    </button>
  );
}
