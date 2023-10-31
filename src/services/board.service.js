import { db } from "@/firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";

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

  async getRetros() {
    const querySnapshot = await getDocs(collection(db, "retros"));
    const docs = [];
    querySnapshot.forEach((doc) => {
      docs.push({ ...doc.data(), id: doc.id, path: doc.ref.path });
    });
    return docs;
  },
};
