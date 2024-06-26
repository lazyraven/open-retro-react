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
  ClockCircle: "clock",
  Play: "play",
  Pause: "pause",
  Stopwatch: "stopwatch",
};

export const buildQRImage = (dataUrl) =>
  `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${dataUrl}`;

export const RETRO_STATES = {
  Write: "WRITE",
  Vote: "VOTE",
  Discuss: "DISCUSS",
};

export const MAX_RETRO_VOTES_ALLOWED = 5;
