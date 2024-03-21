import { db } from "@/firebase";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import {
  collection,
  getDoc,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  query,
  updateDoc,
  orderBy,
} from "firebase/firestore";

export default {
  async getRetro({ boardId, retroId }) {
    const record = await getDoc(doc(db, "boards", boardId, "retros", retroId));
    return {
      id: record.id,
      path: record.ref.path,
      ...record.data(),
    };
  },

  createRetro({ boardId }, formBody) {
    return addDoc(collection(db, "boards", boardId, "retros"), formBody);
  },

  async getBoardRetros({ boardId }) {
    const retrosRef = collection(db, "boards", boardId, "retros");
    const q = query(retrosRef, orderBy("createdDate", "desc"));
    const querySnapshot = await getDocs(q);
    const docs = [];
    querySnapshot.forEach((doc) => {
      docs.push({ id: doc.id, path: doc.ref.path, ...doc.data() });
    });
    return docs;
  },

  deleteRetro(boardId, deleteRetroId) {
    deleteDoc(doc(db, "boards", boardId, "retros", deleteRetroId));
  },

  async generateAndUploadPdf({ storagePath, fileName, htmlInput }) {
    try {
      const canvas = await html2canvas(htmlInput);
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
        "PNG",
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio
      );

      const pdfDataUri = pdf.output("datauristring");
      // Convert data URL to Blob object
      const byteCharacters = atob(pdfDataUri.split(",")[1]);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: "application/pdf" });

      // Create a file object
      const fileObject = new File([blob], fileName, {
        type: "application/pdf",
      });

      const storage = getStorage();
      const storageRef = ref(storage, storagePath);
      const storageSnapshot = await uploadBytes(storageRef, fileObject);
      return storageSnapshot;
    } catch (error) {
      console.log(error, "error");
    }
  },

  updateRetroReportSrc({ boardId, retroId }, { reportSrcPath }) {
    updateDoc(doc(db, "boards", boardId, "retros", retroId), {
      reportSrcPath,
    });
  },
};
