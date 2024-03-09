import { useEffect, useRef, useState } from "react";
import BaseIcon from "@/components/BaseIcon";
import { ICONS } from "@/helpers/constant";
import boardService from "@/services/board.service";
import { useParams } from "react-router-dom";
import NewNotes from "@/components/NewNotes";
import RetroDescription from "@/components/RetroDescription";
import { toast } from "react-toastify";

export default function RetroId() {
  const [notes, setNotes] = useState([]);

  const params = useParams();

  const getRetroNotes = async () => {
    try {
      const notes = await boardService.getRetroNotes({
        boardId: params.boardId,
        retroId: params.retroId,
        // retroId: params.OpenRetroId,
      });
      setNotes(notes);
      // setPdfData(notes);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getRetroNotes({ boardId: params.boardId, retroId: params.OpenRetroId });
  }, []);

  const pdfRef = useRef();

  const dowanloadPdf = async () => {
    const input = pdfRef.current;
    try {
      const reportSrc = `${params.boardId}/${params.retroId}.pdf`;
      const pdfResult = await boardService.generateAndUploadPdf({
        storagePath: reportSrc,
        fileName: `${params.retroId}.pdf`,
        htmlInput: input,
      });
      console.log(pdfResult, "pdfResult");
      toast.success("Generate pdf is Updated!");
      updateGenratePdf();
    } catch (error) {
      console.log(error, "error");
      toast.error("Error occurred, while uploading file.");
    }
  };

  const updateGenratePdf = async () => {
    const reportSrcPath = `${params.boardId}/${params.retroId}`;
    try {
      await boardService.updateRetros(
        { boardId: params.boardId, retroId: params.retroId },
        reportSrcPath
      );
    } catch (error) {
      console.log(error, "error");
      toast.error("Error occurred, while uploading file.");
    }
  };

  return (
    <div className="relative">
      <h1 className="mb-4 text-zinc-200">
        Sprint Retro 1
        <span className="text-zinc-500 text-sm"> | Sun Mar 03 2024</span>
      </h1>
      <div
        // id="content"
        ref={pdfRef}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <div className="flex flex-col gap-3 py-2 border border-zinc-800 px-3 rounded-md">
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <h1 className="font-semibold text-zinc-200 capitalize">
                Went Well
              </h1>
            </div>
            <NewNotes
              tagName="went-well"
              notes={notes}
              getRetroNotes={getRetroNotes}
            ></NewNotes>
          </div>
          <div>
            {notes.map((note, index) => {
              if (!note || note.tagName !== "went-well") return null;
              return (
                <div className="mb-2" key={"note" + index}>
                  <RetroDescription
                    note={note}
                    getRetroNotes={getRetroNotes}
                  ></RetroDescription>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-3 py-2 border border-zinc-800 px-3 rounded-md">
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <h1 className="font-semibold capitalize text-zinc-200">
                To-Improve
              </h1>
            </div>
            <NewNotes
              tagName="to-improve"
              getRetroNotes={getRetroNotes}
            ></NewNotes>
          </div>
          <div>
            {notes.map((note, index) => {
              if (!note || note.tagName !== "to-improve") return null;
              return (
                <div className="mb-2" key={"note" + index}>
                  <RetroDescription
                    note={note}
                    getRetroNotes={getRetroNotes}
                  ></RetroDescription>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-3 py-2 border border-zinc-800 px-3 rounded-md">
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <h1 className="font-semibold capitalizetext-white text-zinc-200">
                Action Item
              </h1>
            </div>
            <NewNotes
              tagName="action-item"
              getRetroNotes={getRetroNotes}
            ></NewNotes>
          </div>
          <div>
            {notes.map((note, index) => {
              if (!note || note.tagName !== "action-item") return null;
              return (
                <div className="mb-2" key={"note" + index}>
                  <RetroDescription
                    note={note}
                    getRetroNotes={getRetroNotes}
                  ></RetroDescription>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <button
        type="button"
        onClick={(event) => {
          dowanloadPdf(event, notes);
        }}
        className="flex gap-1 items-center px-4 fixed right-4 bottom-4 py-2 border border-blue-500  text-white rounded-md bg-blue-500 shadow-2xl"
      >
        <BaseIcon
          iconName={ICONS.Bolt}
          className="flex h-5 w-5 text-white"
        ></BaseIcon>
        Generate Report
      </button>
    </div>
  );
}
