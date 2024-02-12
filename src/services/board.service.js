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

  async getRetrosDetail({ boardId }) {
    const boardRef = collection(db, "retros");
    // const q = query(boardRef, where("boardId", "==", "wR5rbH19gJQVxV2O60F7"));
    const q = query(boardRef, where("boardId", "==", boardId));
    const docs = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      docs.push({ ...doc.data(), id: doc.id, path: doc.ref.path });
    });
    return docs;

    // return onSnapshot(q, (snapShot) => {
    //   let retroDetails = [];
    //   snapShot.docs.forEach((doc) => {
    //     retroDetails.push({ ...doc.data(), id: doc.id });
    //   });
    //   console.log("retroDetails", retroDetails);
    //   return retroDetails;
    // });

    // return onSnapshot(q, (document) => {
    //   return document.data();
    // });
  },

  async getNotes({ retroId }) {
    const q = query(collection(db, "notes"), where("retroId", "==", retroId));
    const docs = [];

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      docs.push({ ...doc.data(), id: doc.id, path: doc.ref.path });
    });
    return docs;
  },
};
