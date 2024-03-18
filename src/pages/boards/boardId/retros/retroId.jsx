import { useEffect, useRef, useState } from "react";
import BaseIcon from "@/components/BaseIcon";
import { ICONS } from "@/helpers/constant";
import boardService from "@/services/board.service";
import { useParams } from "react-router-dom";
import NewNote from "@/components/NewNote";
import EditNote from "@/components/EditNote";
import { toast } from "react-toastify";
import notesService from "@/services/notes.service";
import TimeSlide from "@/components/TimeSlide";
import { parseDateTime } from "@/utils/common.util";
import BaseButton from "@/components/BaseButton";

export default function RetroId() {
  const tileSectionConfigs = {
    wentWell: {
      tagName: "went-well",
      title: "Went Well",
      placeholder: "What went well...",
    },
    toImprove: {
      tagName: "to-improve",
      title: "To Improve",
      placeholder: "What to improve...",
    },
    actionItem: {
      tagName: "action-item",
      title: "Action Item",
      placeholder: "What action item...",
    },
  };
  const [tileNotes, setTileNotes] = useState(initTileNotes());
  function initTileNotes() {
    return {
      [tileSectionConfigs.wentWell.tagName]: [],
      [tileSectionConfigs.toImprove.tagName]: [],
      [tileSectionConfigs.actionItem.tagName]: [],
    };
  }

  const [retro, setRetro] = useState({});
  const [openSlide, setOpenSlide] = useState(false);

  const params = useParams();

  function distributeTileNotes({ tileSectionConfigs, retroNotes }) {
    const tempTileNotes = initTileNotes();
    if (retroNotes && retroNotes.length) {
      retroNotes.forEach((note, index) => {
        switch (note.tagName) {
          case tileSectionConfigs.wentWell.tagName:
            tempTileNotes[tileSectionConfigs.wentWell.tagName].push(note);
            break;

          case tileSectionConfigs.toImprove.tagName:
            tempTileNotes[tileSectionConfigs.toImprove.tagName].push(note);
            break;

          case tileSectionConfigs.actionItem.tagName:
            tempTileNotes[tileSectionConfigs.actionItem.tagName].push(note);
            break;
          default:
            return;
        }
        setTileNotes(tempTileNotes);
      });
    }
  }

  function listenRetroNotesChange({ retroId }) {
    try {
      notesService.listenRetroNotesChange({ retroId }, (retroNotes) => {
        distributeTileNotes({ tileSectionConfigs, retroNotes });
      });
    } catch (e) {
      console.log(e);
    }
  }

  async function getRetro({ boardId, retroId }) {
    try {
      const result = await boardService.getRetro({ boardId, retroId });
      if (result && result.id) {
        setRetro(result);
      }
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getRetro({ boardId: params.boardId, retroId: params.retroId });
    listenRetroNotesChange({ retroId: params.retroId });
  }, []);

  const pdfRef = useRef();

  const downloadPdf = async () => {
    const input = pdfRef.current;
    const reportSrc = `${params.boardId}/${params.retroId}.pdf`;
    const pdfResult = await boardService.generateAndUploadPdf({
      storagePath: reportSrc,
      fileName: `${params.retroId}.pdf`,
      htmlInput: input,
    });
    toast.success("PDF report generated successfully. Check reports tab.");
    await updateGenratePdf();
  };

  const updateGenratePdf = async () => {
    const reportSrcPath = `${params.boardId}/${params.retroId}`;
    try {
      await boardService.updateRetros(
        { boardId: params.boardId, retroId: params.retroId },
        reportSrcPath
      );
    } catch (error) {
      toast.error("Error occurred, while uploading file.");
    }
  };

  const openSlideDisplay = () => {
    console.log("open slide");
    setOpenSlide(true);
  };

  return (
    <div className="flex flex-col relative">
      <div className="flex gap-1 items-center mb-4">
        <h1 className="text-zinc-200">{retro.retroName}</h1>
        <span className="text-zinc-400 text-sm">
          • {parseDateTime(retro.createdDate)}
        </span>
        <div className="flex-auto w-64"></div>
        <button type="button" className="flex-1" onClick={openSlideDisplay}>
          <BaseIcon
            iconName={ICONS.ClockCircle}
            className="flex h-5 w-5 text-white"
          ></BaseIcon>
        </button>
        {openSlide && <TimeSlide></TimeSlide>}
      </div>

      <div
        // id="content"
        ref={pdfRef}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-16"
      >
        {Object.values(tileSectionConfigs).map((tile) => (
          <div
            key={"tile-section" + tile.tagName}
            className="flex flex-col gap-3 py-2 border border-zinc-800 px-3 rounded-md"
          >
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <h5 className="font-semibold text-zinc-200 capitalize">
                  {tile.title}
                </h5>
              </div>
              <NewNote
                tagName={tile.tagName}
                placeholder={tile.placeholder}
                boardId={params.boardId}
              ></NewNote>
            </div>
            <div>
              {tileNotes[tile.tagName].reverse().map((note, index) => {
                if (!note || note.tagName !== tile.tagName) return null;
                return (
                  <div className="mb-2" key={"note" + index}>
                    <EditNote note={note} boardId={params.boardId}></EditNote>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <BaseButton
        theme="PRIMARY"
        size="XL"
        className="fixed right-4 bottom-4 !bg-blue-500 shadow-2xl"
        onClick={downloadPdf}
      >
        <div className="flex gap-1 items-center">
          <BaseIcon
            iconName={ICONS.Bolt}
            className="flex h-5 w-5 text-zinc-50"
          ></BaseIcon>
          <span className="text-zinc-50">Generate Report</span>
        </div>
      </BaseButton>
    </div>
  );
}
