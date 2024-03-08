export default function BaseFirstChar(props) {
  const { note } = props;
  return (
    <span className="flex items-center justify-center bg-zinc-500 rounded-full h-5 w-5 text-white text-xs">
      {note.createdBy &&
        typeof note.createdBy === "string" &&
        note.createdBy.trim().charAt(0).toUpperCase()}
    </span>
  );
}
