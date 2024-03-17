import { forwardRef } from "react";
const BaseInput = forwardRef(function BaseInput(
  { labelName, type, disabled, ...restProps },
  ref
) {
  let classes = "bg-zinc-800 border-zinc-700 border rounded-sm py-1.5 px-3";

  if (disabled) {
    classes += " text-zinc-400";
  }

  return (
    <div className="flex flex-col gap-y-1 min-w-[16rem]">
      <div className="flex gap-1">
        <label htmlFor="" className="text-zinc-200 font-semibold text-sm">
          {labelName}
        </label>
      </div>
      <input
        ref={ref}
        type={type || "text"}
        className={classes}
        {...restProps}
      />
    </div>
  );
});

export default BaseInput;
