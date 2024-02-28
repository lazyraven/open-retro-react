import { useEffect, useRef, useState } from "react";
import BaseIcon from "@/components/BaseIcon";
import { ICONS } from "@/helpers/constant";
import boardService from "@/services/board.service";
import { useParams } from "react-router-dom";
import NewNotes from "@/components/NewNotes";
import RetroDescription from "@/components/RetroDescription";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

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
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getRetroNotes({ boardId: params.boardId, retroId: params.OpenRetroId });
  }, []);

  const pdfRef = useRef();

  const dowanloadPdf = () => {
    const input = pdfRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4", true);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 30;
      pdf.addImage(
        imgData,
        " PNG",
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio
      );
      pdf.save("boardReport.pdf");
    });
    // let doc = new jsPDF("p", "pt", "a4");
    // doc.html(document.querySelector("#content"), {
    //   callback: function (pdf) {
    //     // let pageCount = doc.internal.getNumberOfPages();
    //     // pdf.deletePage(pageCount);
    //     pdf.save("mypdf.pdf");
    //   },
    // });
  };

  // const contentRef = useRef(null);

  // const generatePdf = async () => {
  //   const content = contentRef.current;

  //   if (!content) return;

  //   try {
  //     const canvas = await html2canvas(content);
  //     const imgData = canvas.toDataURL("text/png");
  //     const pdf = new jsPDF();
  //     const imgWidth = 210;
  //     const pageHeight = 297;
  //     const imgHeight = (canvas.height * imgWidth) / canvas.width;
  //     let heightLeft = imgHeight;

  //     let position = 0;

  //     pdf.addImage(imgData, "TEXT", 0, position, imgWidth, imgHeight);
  //     heightLeft -= pageHeight;

  //     while (heightLeft >= 0) {
  //       position = heightLeft - imgHeight;
  //       pdf.addPage();
  //       pdf.addImage(imgData, "TEXT", 0, position, imgWidth, imgHeight);
  //       heightLeft -= pageHeight;
  //     }

  //     pdf.save("download.pdf");

  //     // Copy PDF text to clipboard
  //     const text = pdf.internal.getText();
  //     navigator.clipboard.writeText(text);
  //     console.log("PDF text copied to clipboard:", text);
  //   } catch (error) {
  //     console.error("Error generating PDF:", error);
  //   }

  return (
    <div className="relative">
      <div
        // id="content"
        ref={pdfRef}
        className="grid grid-cols-3 px-5 gap-5   "
      >
        <div className="flex flex-col gap-3 py-2 bg-[#121212] px-3 rounded-sm">
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <h1 className="font-semibold  text-slate-200 text-lg capitalize">
                Went Well
              </h1>
              <BaseIcon
                iconName={ICONS.ellipsisvertical}
                className=" flex h-5 w-5 text-gray-400"
              ></BaseIcon>
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

        <div className="flex flex-col gap-3 py-2 bg-[#121212] px-3 rounded-sm">
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <h1 className="font-semibold text-lg capitalize text-slate-200">
                To-Improve
              </h1>
              <BaseIcon
                iconName={ICONS.ellipsisvertical}
                className=" flex h-5 w-5 text-gray-400"
              ></BaseIcon>
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
        <div className="flex flex-col gap-3 py-2 bg-[#121212] px-3 rounded-sm">
          <div className=" flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <h1 className="font-semibold text-lg capitalizetext-white  text-slate-200">
                Action Item
              </h1>
              <BaseIcon
                iconName={ICONS.ellipsisvertical}
                className=" flex h-5 w-5 text-gray-400"
              ></BaseIcon>
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
        // onClick={generatePdf}
        onClick={dowanloadPdf}
        className="px-4 fixed right-4 bottom-4 py-2 border bg-black text-slate-300 rounded-md"
      >
        Generate Report
      </button>
    </div>
  );
}
