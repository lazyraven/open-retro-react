import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { useEffect, useState } from "react";

export default function Reports() {
  const [pdfSrc, setPdfSrc] = useState("");

  const storage = getStorage();
  const starsRef = ref(storage, "retro-reports/boardReport.pdf");

  async function setPdfReports() {
    try {
      const pdf = await getDownloadURL(starsRef);
      if (pdf) {
        setPdfSrc(pdf);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    setPdfReports();
  }, []);

  return (
    <>
      <div>
        {pdfSrc && <embed src={pdfSrc} width="800px" height="1600px" />}

        <input type="file" />
      </div>
    </>
  );
}
