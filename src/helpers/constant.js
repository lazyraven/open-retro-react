export const ICONS = {
  Plus: "plus",
  ellipsisvertical: "ellipsis-vertical",
  rocket: "rocket",
  LikeThumb: "hand-thumb-up",
  Comment: "chat-bubble-oval-left",
  Delete: "trash",
  Bolt: "bolt",
  ArrowUTurn: "arrow-uturn-left",
  ArrowUpOnSquare: "arrow-up-on-square",
  Edit: "pencil-square",
  Close: "close",
  SolidCheckCircle: "solid-check-circle",
  PlusCircle: "plus-circle",
  Map: "map",
  Phone: "phone",
  Envelope: "envelope",
};

export const buildQRImage = (dataUrl) =>
  `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${dataUrl}`;
