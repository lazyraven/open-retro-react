import { useContext, useEffect, useRef, useState } from "react";
import BaseIcon from "@/components/BaseIcon";
import { ICONS } from "@/helpers/constant";
import retroService from "@/services/retro.service";
import { useParams } from "react-router-dom";
import NewNote from "@/components/NewNote";
import EditNote from "@/components/EditNote";
import { toast } from "react-toastify";

import pdfService from "@/services/pdf.service";
import notesService from "@/services/notes.service";
import { parseDateTime } from "@/utils/common.util";
import BaseButton from "@/components/BaseButton";
import { RETRO_STATES } from "@/helpers/constant";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import BoardContext from "@/contexts/BoardContext";

export default function RetroId() {
  const { board } = useContext(BoardContext);
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
  const [retroState, setRetroState] = useState({
    stage: RETRO_STATES.Write,
  });

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
      const result = await retroService.getRetro({ boardId, retroId });
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
    const pdfResult = await pdfService.generateAndUploadPdf({
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
      await retroService.updateRetroReportSrc(
        { boardId: params.boardId, retroId: params.retroId },
        { reportSrcPath }
      );
    } catch (error) {
      toast.error("Error occurred, while uploading file.");
    }
  };

  const handleTabChange = (tab) => {
    setRetroState(tab);
  };

  const handleArrowClick = async (direction) => {
    let retroStage = "";
    if (direction === "left") {
      switch (retroState.stage) {
        case RETRO_STATES.Write:
          retroStage = RETRO_STATES.Discuss;
          break;
        case RETRO_STATES.Vote:
          retroStage = RETRO_STATES.Write;
          break;
        case RETRO_STATES.Discuss:
          retroStage = RETRO_STATES.Vote;
          break;
        default:
          retroStage = RETRO_STATES.Write;
      }
    } else if (direction === "right") {
      switch (retroState.stage) {
        case RETRO_STATES.Write:
          retroStage = RETRO_STATES.Vote;
          break;
        case RETRO_STATES.Vote:
          retroStage = RETRO_STATES.Discuss;
          break;
        case RETRO_STATES.Discuss:
          retroStage = RETRO_STATES.Write;
          break;
        default:
          retroStage = RETRO_STATES.Write;
      }
    }

    await retroService.updateRetroState(
      { retroId: params.retroId },
      { stage: retroStage }
    );
    console.log(retroState, "retrostate");
  };
  return (
    <div className="flex flex-col gap-y-3 relative">
      <div className="flex gap-1 items-center">
        <span className="text-2xl">📝</span>
        <h1 className="text-zinc-200 text-lg">{retro.retroName}</h1>
        <span className="text-zinc-400 text-sm">
          • {parseDateTime(retro.createdDate)}
        </span>
      </div>
      <div className="flex justify-center gap-4 mb-2">
        {Object.keys(RETRO_STATES).map((state, index) => {
          const modifiedIndex = index + 1;
          return (
            <div key={"state" + index} className="flex gap-2 items-center">
              <button
                onClick={() => handleTabChange(RETRO_STATES[state], index)}
                className={
                  retroState.stage === RETRO_STATES[state]
                    ? "px-3 py-1 text-zinc-200 bg-blue-500 rounded-full"
                    : "active text-zinc-200 px-3 py-1 rounded-full bg-zinc-600"
                }
              >
                {modifiedIndex}
              </button>
              <span className="text-zinc-200">{state}</span>
            </div>
          );
        })}
        <span className="text-zinc-200 flex items-center">|</span>
        <div className="flex items-center gap-2">
          <button onClick={() => handleArrowClick("left")}>
            <ChevronLeftIcon className="w-4 h-4 text-zinc-200"></ChevronLeftIcon>
          </button>
          <button onClick={() => handleArrowClick("right")}>
            <ChevronRightIcon className="w-4 h-4 text-zinc-200"></ChevronRightIcon>
          </button>
        </div>
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
              {retroState.stage !== RETRO_STATES.Vote &&
                retroState.stage !== RETRO_STATES.Discuss && (
                  <NewNote
                    tagName={tile.tagName}
                    placeholder={tile.placeholder}
                    boardId={params.boardId}
                  ></NewNote>
                )}
            </div>
            <div>
              {tileNotes[tile.tagName]
                .slice()
                .reverse()
                .map((note, index) => {
                  if (!note || note.tagName !== tile.tagName) return null;
                  return (
                    <div className="mb-2" key={"edit-note-" + note.id + index}>
                      <EditNote
                        retroState={retroState}
                        note={note}
                        boardId={params.boardId}
                      ></EditNote>
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
