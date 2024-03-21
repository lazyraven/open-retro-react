import { db, rtdb } from "@/firebase";
import { ref, update } from "firebase/database";

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

  updateRetroReportSrc({ boardId, retroId }, { reportSrcPath }) {
    updateDoc(doc(db, "boards", boardId, "retros", retroId), {
      reportSrcPath,
    });
  },

  async updateRetroState({ retroId }, { stage }) {
    const updates = {};
    updates[`retro-state/${retroId}`] = {
      stage,
    };
    const rtdbRef = ref(rtdb);
    await update(rtdbRef, updates);
    return stage;
  },
};
