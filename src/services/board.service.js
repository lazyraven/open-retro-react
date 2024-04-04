import { db } from "@/firebase";
import { collection, getDoc, addDoc, doc, updateDoc } from "firebase/firestore";

export default {
  createBoard(formBody) {
    return addDoc(collection(db, "boards"), formBody);
  },

  updateBoardOwner({ boardId }, { owner }) {
    const boardIdRef = doc(db, "boards", boardId);
    return updateDoc(boardIdRef, {
      owner,
    });
  },

  async getBoard({ boardId }) {
    const record = await getDoc(doc(db, "boards", boardId));
    return {
      id: record.id,
      path: record.ref.path,
      ...record.data(),
    };
  },
};
