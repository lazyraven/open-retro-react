import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { useEffect, useState } from "react";
import boardService from "@/services/board.service";
import { useParams } from "react-router-dom";
import BaseIcon from "@/components/BaseIcon";
import { ICONS } from "@/helpers/constant";

export default function Reports() {
  const [pdfSrc, setPdfSrc] = useState("");
  const [reportRetros, setReportRetros] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const storage = getStorage();
  const params = useParams();

  const getBoardRetros = async () => {
    try {
      const boardRetros = await boardService.getBoardRetros({
        boardId: params.boardId,
      });
      if (boardRetros && boardRetros.length) {
        const filteredRetros = boardRetros.filter(
          (retro) => retro.pathRetroSrc
        );
        setReportRetros(filteredRetros);
      }
    } catch (e) {
      console.log(e);
    }
  };

  async function setPdfReports(starsRef) {
    try {
      const pdf = await getDownloadURL(starsRef);
      if (pdf) {
        setPdfSrc(pdf);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const viewReport = (event, pathRetroSrc) => {
    setIsOpen(true);
    const starsRef = ref(storage, `${pathRetroSrc}.pdf`);
    setPdfReports(starsRef);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  useEffect(() => {
    getBoardRetros();
  }, []);

  return (
    <div className="flex flex-col my-4">
      <div className="flex flex-wrap gap-3 text-white">
        {reportRetros.length ? (
          reportRetros.map((retroDetails, index) => {
            return (
              <div
                key={retroDetails.retroName + index}
                className="flex flex-col border-solid w-72 rounded-md p-3 bg-zinc-800"
              >
                {/* <div className="divide-y divide-zinc-200 m-auto"> */}
                <div className="flex">
                  <div>
                    <h1 className="text-md text-left capitalize text-zinc-300">
                      <strong>{retroDetails.retroName}</strong>
                    </h1>
                  </div>
                </div>
                <div className="text-xs text-zinc-400 py-2 gap-2">
                  {retroDetails.createdDate}
                </div>
                <div className="flex justify-end gap-2 mt-5">
                  <button
                    type="button"
                    className="px-3 py-1 text-sm items-center border rounded-sm border-zinc-600 hover:bg-zinc-700"
                    onClick={(event) => {
                      viewReport(event, retroDetails.pathRetroSrc);
                    }}
                  >
                    View
                  </button>
                  <button
                    type="button"
                    className="px-3 py-1 text-sm items-center border rounded-sm border-zinc-600 text-zinc-900 bg-zinc-50 hover:bg-zinc-200"
                  >
                    Download
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="flex flex-col items-center justify-center w-full">
            <span className="text-4xl">📊</span>
            <h6 className="text-zinc-300">No reports generated !</h6>
          </div>
        )}
      </div>

      {isOpen && (
        <div>
          <div
            className="relative z-10 text-black"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
          >
            <div className="fixed inset-0 bg-gradient-to-b from-zinc-600 to-zinc-850 bg-opacity-70 backdrop-blur-sm transition-opacity"></div>
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                {/* <div className="relative transform overflow-hidden rounded-lg bg-white text-left  transition-all sm:my-8 sm:w-full sm:max-w-lg p-3"> */}
                <div className="relative transform overflow-hidden rounded-lg bg-white text-left  transition-all p-3">
                  <button
                    type="button"
                    onClick={(event) => {
                      closeModal(event);
                    }}
                    className=" top-2"
                  >
                    <BaseIcon
                      iconName={ICONS.Close}
                      className=" flex h-6 w-6 text-zinc-600"
                    ></BaseIcon>
                  </button>
                  {pdfSrc && (
                    <embed src={pdfSrc} width="600px" height="650px" />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
