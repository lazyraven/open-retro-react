export default function BaseInput({ labelName, type, disabled, ...restProps }) {
  let classes = "bg-zinc-800 border-zinc-700 border rounded-sm py-1.5 px-3";

  if (disabled) {
    classes += " text-zinc-400";
  }

  return (
    <div className="flex flex-col gap-y-1">
      <div className="flex gap-1">
        <label htmlFor="" className="text-zinc-300">
          {labelName}
        </label>
      </div>
      <input type={type || "text"} className={classes} {...restProps} />
    </div>
  );
}
