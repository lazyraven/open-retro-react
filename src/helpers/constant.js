export const ICONS = {
  Plus: "plus",
  ellipsisvertical: "ellipsis-vertical",
  rocket: "rocket",
  LikeThumb: "hand-thumb-up",
  Comment: "chat-bubble-oval-left",
  Delete: "trash",
};

export const buildQRImage = (dataUrl) =>
  `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${dataUrl}`;
