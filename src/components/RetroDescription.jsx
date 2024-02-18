import BaseIcon from "@/components/BaseIcon";
import { ICONS } from "@/helpers/constant";

export default function RetroDescription(props) {
  const { note } = props;

  let descriptionClsName = "";
  const descriptionClasses = () => {
    descriptionClsName =
      note.tag === "went-well"
        ? "bg-[#009886]"
        : note.tag === "action-item"
        ? "bg-[#A63EB9]"
        : note.tag === "to-improve"
        ? "bg-[#E92C64]"
        : "bg-[#009886]";
    // console.log("classes", descriptionClsName);
    return descriptionClsName;
  };

  return (
    <div
      className={`${descriptionClasses()} px-4 py-1 flex flex-col w-full  justify-between rounded-sm text-white`}
    >
      <div className="flex justify-between">
        <h1 className="font-medium text-sm ">{note.description}</h1>
        <button type="button">
          <BaseIcon
            iconName={ICONS.ellipsisvertical}
            className=" flex h-5 w-5 text-gray-200"
          ></BaseIcon>
        </button>
      </div>
      <div className="flex gap-1 justify-end">
        <button type="button" className="flex gap-1 items-center">
          <BaseIcon
            iconName={ICONS.LikeThumb}
            className="flex h-4 w-4"
          ></BaseIcon>
          <p className="text-sm font-normal">0</p>
        </button>
        <button type="button" className="flex gap-1 items-center">
          <BaseIcon
            iconName={ICONS.Comment}
            className="flex h-4 w-4"
          ></BaseIcon>
          <p className="text-sm font-semibold">0</p>
        </button>
      </div>
    </div>
  );
}
