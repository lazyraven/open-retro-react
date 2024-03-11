export default function BaseButton(props) {
  const { theme, children, ...restProps } = props;
  let classes = "";
  switch (theme) {
    case "PRIMARY":
      classes =
        "px-4 py-1 rounded-sm text-zinc-900 bg-zinc-100 hover:bg-zinc-200";
      break;
    case "SECONDARY":
      classes = "px-4 py-1 rounded-md text-white border border-zinc-700";
      break;
    case "DANGER":
      classes = "px-4 py-1 rounded-md text-red-700 border border-red-700";
      break;
    default:
      classes = "px-4 py-1 rounded-sm text-white";
  }

  return (
    <button type="button" className={classes} {...restProps}>
      {children}
    </button>
  );
}
