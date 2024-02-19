import { db } from "@/firebase";
import {
  collection,
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
  // async getBoards({ boardId }) {
  //   console.log("getBoards boardId", boardId);
  //   const q = query(collection(db, "boards"), where("boardId", "==", boardId));
  //   const docs = [];
  //   const querySnapshot = await getDocs(q);
  //   querySnapshot.forEach((doc) => {
  //     docs.push({ ...doc.data(), id: doc.id, path: doc.ref.path });
  //   });
  //   console.log("docs board", docs);
  //   return docs;
  // },
  async getBoards() {
    const querySnapshot = await getDocs(collection(db, "boards"));
    const docs = [];
    querySnapshot.forEach((doc) => {
      docs.push({ ...doc.data(), id: doc.id, path: doc.ref.path });
    });
    return docs;
  },
  createBoard(formBody) {
    return addDoc(collection(db, "boards"), formBody);
  },

  createRetro(formBody) {
    return addDoc(collection(db, "retros"), formBody);
  },

  async getRetros() {
    const querySnapshot = await getDocs(collection(db, "retros"));
    const docs = [];
    querySnapshot.forEach((doc) => {
      docs.push({ ...doc.data(), id: doc.id, path: doc.ref.path });
    });
    return docs;
  },

  async getRetrosDetail({ boardId }) {
    const boardRef = collection(db, "retros");
    const q = query(boardRef, where("boardId", "==", boardId));
    const docs = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      docs.push({ ...doc.data(), id: doc.id, path: doc.ref.path });
    });
    return docs;

    // need to check why this (onSnapshot) is not working
    // return onSnapshot(q, (snapShot) => {
    //   let retroDetails = [];
    //   snapShot.docs.forEach((doc) => {
    //     retroDetails.push({ ...doc.data(), id: doc.id });
    //   });
    //   return retroDetails;
    // });
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
