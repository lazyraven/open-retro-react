import { db } from "@/firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";

export default {
  async getBoards() {
    const querySnapshot = await getDocs(collection(db, "boards"));
    const docs = [];
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
      docs.push(doc);
    });
    return docs;
  },
  createBoard(formBody) {
    return addDoc(collection(db, "boards"), formBody);
  },
};
