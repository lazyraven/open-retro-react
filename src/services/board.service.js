import { db } from "@/firebase";
import {
  collection,
  getDocs,
  addDoc,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";

export default {
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
    console.log("formBody", formBody);
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

  async getRetrosDetail() {
    const boardRef = collection(db, "retros");
    const q = query(boardRef, where("boardId", "==", "wR5rbH19gJQVxV2O60F7"));

    return onSnapshot(q, (snapShot) => {
      let retroDetails = [];
      snapShot.docs.forEach((doc) => {
        retroDetails.push({ ...doc.data(), id: doc.id });
      });
      console.log("retroDetails", retroDetails);
      return retroDetails;
    });

    // return onSnapshot(q, (document) => {
    //   return document.data();
    // });
  },

  async getNotes() {
    const querySnapshot = await getDocs(collection(db, "notes"));
    const docs = [];
    querySnapshot.forEach((doc) => {
      docs.push({ ...doc.data(), id: doc.id, path: doc.ref.path });
    });
    return docs;
  },
};
