import { useContext, useEffect, useRef, useState } from "react";
import _get from "lodash.get";
import BaseIcon from "@/components/BaseIcon";
import { ICONS, MAX_RETRO_VOTES_ALLOWED } from "@/helpers/constant";
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
import { getBoardMemberLocalStorage } from "@/utils/common.util";
import BaseConfirm from "@/components/BaseConfirm";
import BaseFirstChar from "@/components/BaseFirstChar";

export default function RetroId() {
  const params = useParams();
  const storedMember = getBoardMemberLocalStorage({ boardId: params.boardId });
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
  const [memberVoteCount, setMemberVoteCount] = useState(0);

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

  function distributeTileNotes({ tileSectionConfigs, retroNotes }) {
    const tempTileNotes = initTileNotes();
    let tempMemberVoteCount = 0;
    if (retroNotes && retroNotes.length) {
      retroNotes.forEach((note, index) => {
        const noteMemberVoteCount = parseInt(
          _get(note, `members.${storedMember.id}.vote`, 0)
        );

        let totalVotes = 0;
        if (note?.members) {
          totalVotes = Object.values(note.members).reduce((accum, curr) => {
            // console.log("curr => ", curr);
            if (curr?.vote) {
              accum += parseInt(curr.vote);
            }
            return accum;
          }, 0);
        }
        note.totalVotes = totalVotes;

        if (noteMemberVoteCount) {
          tempMemberVoteCount += noteMemberVoteCount;
        }
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

      setMemberVoteCount(tempMemberVoteCount);
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

  function listenRetroStageChange() {
    retroService.listenRetroStageChange({ retroId: params.retroId }, (doc) => {
      if (doc) {
        setRetroState(doc);
      }
    });
  }

  useEffect(() => {
    getRetro({ boardId: params.boardId, retroId: params.retroId });
    listenRetroNotesChange({ retroId: params.retroId });
    listenRetroStageChange();
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
  };

  const RetroStateText = () => {
    switch (retroState.stage) {
      case RETRO_STATES.Write:
        return (
          <h3 className="text-zinc-200 text-center bg-zinc-800 p-3">
            ✏️ Write down all your notes.
          </h3>
        );
      case RETRO_STATES.Vote:
        return (
          <h3 className="text-zinc-200 text-center p-3 bg-zinc-800">
            🙋‍♂️ Vote for your preferred note to discuss.
          </h3>
        );
      case RETRO_STATES.Discuss:
        return (
          <h3 className="text-zinc-200 text-center bg-zinc-800 p-3">
            💬 Start open discussion now.
          </h3>
        );
      default:
        return (
          <h3 className="text-zinc-200 text-center bg-zinc-800 p-3">
            ✏️ Write down all your notes.
          </h3>
        );
    }
  };

  const orderedByState = (tile) => {
    if (!tile || !tileNotes[tile.tagName]) {
      return [];
    }

    switch (retroState.stage) {
      case RETRO_STATES.Write:
        return tileNotes[tile.tagName].slice().reverse();
      case RETRO_STATES.Vote:
        return tileNotes[tile.tagName].slice().reverse();
      case RETRO_STATES.Discuss:
        return tileNotes[tile.tagName].slice().sort((a, b) => {
          console.log("a , b =>", a, b);
          return b.totalVotes - a.totalVotes;
        });
    }
  };

  return (
    <div className="flex flex-col gap-y-3">
      <div className="flex gap-1 items-center">
        <span className="text-2xl">📝</span>
        <h1 className="text-zinc-200 text-lg">{retro.retroName}</h1>
        <span className="text-zinc-400 text-sm">
          • {parseDateTime(retro.createdDate)}
        </span>
      </div>
      <div className="flex flex-col gap-y-3 justify-center items-center relative">
        <div className="border border-zinc-700 rounded-md">
          <div className="flex gap-2 py-3 px-2 md:gap-5 justify-center items-center ">
            {board?.owner == storedMember.id && (
              <BaseButton
                theme="TRANSPARENT"
                disabled={retroState.stage === RETRO_STATES.Write}
                onClick={() => handleArrowClick("left")}
              >
                <ChevronLeftIcon
                  className={
                    retroState.stage === RETRO_STATES.Write
                      ? "w-5 h-5 text-zinc-500"
                      : "w-5 h-5 text-zinc-200"
                  }
                ></ChevronLeftIcon>
              </BaseButton>
            )}
            {Object.keys(RETRO_STATES).map((state, index) => {
              const modifiedIndex = index + 1;
              return (
                <div key={"state" + index} className="flex gap-2 items-center">
                  <div
                    className={
                      retroState.stage === RETRO_STATES[state]
                        ? "px-3 py-1 text-sm font-medium text-zinc-200 bg-blue-500 rounded-full"
                        : "active text-sm font-medium text-zinc-200 px-3 py-1 rounded-full bg-zinc-600"
                    }
                  >
                    {modifiedIndex}
                  </div>
                  <span
                    className={
                      retroState.stage === RETRO_STATES[state]
                        ? " text-blue-500 text-sm font-medium"
                        : "active text-zinc-200 text-sm font-medium"
                    }
                  >
                    {state}
                  </span>
                </div>
              );
            })}

            {board?.owner == storedMember.id && (
              <BaseConfirm
                theme="INFO"
                btnText="Yes"
                confirmText={
                  <>
                    <h6 className="text-base text-zinc-300">
                      Hi {storedMember.name} 👋,
                    </h6>
                    <h5 className="text-base text-zinc-100">
                      Are you sure? you want to move to{" "}
                      <b>
                        {retroState.stage === RETRO_STATES.Write
                          ? RETRO_STATES.Vote
                          : RETRO_STATES.Discuss}
                      </b>
                      &nbsp;stage.
                    </h5>
                  </>
                }
                onConfirm={() => handleArrowClick("right")}
              >
                <BaseButton
                  theme="TRANSPARENT"
                  disabled={retroState.stage === RETRO_STATES.Discuss}
                >
                  <ChevronRightIcon
                    className={
                      retroState.stage === RETRO_STATES.Discuss
                        ? "w-5 h-5 text-zinc-500"
                        : "w-5 h-5 text-zinc-200"
                    }
                  ></ChevronRightIcon>
                </BaseButton>
              </BaseConfirm>
            )}
          </div>
          <RetroStateText></RetroStateText>
        </div>
        {retroState.stage === RETRO_STATES.Vote && (
          <div className="absolute left-0 flex flex-col gap-y-1 p-3">
            <div className="flex gap-1 items-center">
              <BaseFirstChar word={storedMember?.name}></BaseFirstChar>
              <p className="text-zinc-200">{storedMember?.name}</p>
            </div>
            <span className="text-zinc-400 text-sm">
              Remaining Votes:{" "}
              <b className="text-zinc-200">
                {MAX_RETRO_VOTES_ALLOWED - memberVoteCount}
              </b>
            </span>
          </div>
        )}
      </div>
      <div
        ref={pdfRef}
        className="grid grid-cols-1 md:grid-cols-3 gap-x-5 gap-y-3 pb-16"
      >
        {Object.values(tileSectionConfigs).map((tile) => (
          <div
            key={"tile-section" + tile.tagName}
            className="flex flex-col gap-3 py-2 rounded-md"
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
              {orderedByState(tile).map((note, index) => {
                if (!note || note.tagName !== tile.tagName) return null;
                return (
                  <div className="mb-2" key={"edit-note-" + note.id + index}>
                    <EditNote
                      retroState={retroState}
                      memberVoteCount={memberVoteCount}
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
