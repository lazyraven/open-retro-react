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
  createBoard(formBody) {
    return addDoc(collection(db, "boards"), formBody);
  },

  async getBoard({ boardId }) {
    const record = await getDoc(doc(db, "boards", boardId));
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
    const querySnapshot = await getDocs(
      collection(db, "boards", boardId, "retros")
    );
    const docs = [];
    querySnapshot.forEach((doc) => {
      docs.push({ id: doc.id, path: doc.ref.path, ...doc.data() });
    });
    return docs;
  },

  deleteRetro(boardId, deleteRetroId) {
    deleteDoc(doc(db, "boards", boardId, "retros", deleteRetroId));
  },

  createNotes({ boardId, retroId }, formBody) {
    console.log("notesModel formBody", formBody);
    return addDoc(
      collection(db, "boards", boardId, "retros", retroId, "notes"),
      formBody
    );
  },

  async getRetroNotes({ boardId, retroId }) {
    const querySnapshot = await getDocs(
      collection(db, "boards", boardId, "retros", retroId, "notes")
    );
    const docs = [];
    querySnapshot.forEach((doc) => {
      docs.push({ id: doc.id, path: doc.ref.path, ...doc.data() });
    });
    return docs;
  },

  deleteNote(boardId, retroId, deleteNoteId) {
    // deleteDoc(doc(db, "notes", deleteNoteId));
    deleteDoc(
      doc(db, "boards", boardId, "retros", retroId, "notes", deleteNoteId)
    );
  },

  updateNote(boardId, retroId, noteId, noteUpdateDetail) {
    const docRef = doc(
      db,
      "boards",
      boardId,
      "retros",
      retroId,
      "notes",
      noteId
    );
    updateDoc(docRef, {
      description: noteUpdateDetail.description,
      noteId: noteId,
    });
  },
};
