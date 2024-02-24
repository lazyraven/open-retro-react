import { db } from "@/firebase";
import {
  collection,
  getDoc,
  getDocs,
  addDoc,
  query,
  where,
  deleteDoc,
  doc,
  updateDoc,
  // onSnapshot,
} from "firebase/firestore";

export default {
  async getBoard({ boardId }) {
    const record = await getDoc(doc(db, "boards", boardId));
    return {
      id: record.id,
      path: record.ref.path,
      ...record.data(),
    };
  },
  async getBoardRetros({ boardId }) {
    const querySnapshot = await getDocs(
      collection(db, "boards", boardId, "retros")
    );
    const docs = [];
    querySnapshot.forEach((doc) => {
      docs.push({ id: doc.id, path: doc.ref.path, ...doc.data() });
    });
    return docs;
  },

  createBoard(formBody) {
    return addDoc(collection(db, "boards"), formBody);
  },

  createRetro({ boardId }, formBody) {
    return addDoc(collection(db, "boards", boardId, "retros"), formBody);
  },

  async getNotes({ retroId }) {
    const q = query(collection(db, "notes"), where("retroId", "==", retroId));
    const docs = [];

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      docs.push({ ...doc.data(), id: doc.id, path: doc.ref.path });
    });
    return docs;
  },

  createNotes(formBody) {
    return addDoc(collection(db, "notes"), formBody);
  },

  deleteRetro(deleteRetroId) {
    deleteDoc(doc(db, "retros", deleteRetroId));
  },

  deleteNote(deleteNoteId) {
    deleteDoc(doc(db, "notes", deleteNoteId));
  },

  updateNote(noteUpdateDetail) {
    // console.log("noteUpdateDetail", noteUpdateDetail);
    const docRef = doc(db, "notes", noteUpdateDetail.noteId);
    updateDoc(docRef, {
      description: noteUpdateDetail.description,
      noteId: noteUpdateDetail.noteId,
    });
    //  .then(()=>{
    //    this.author = "";
    //    this.title = "";
    //    this.checkBookId = ""
    //  })
  },
};
