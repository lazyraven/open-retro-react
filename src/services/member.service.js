import { ref, push, set, update, onValue } from "firebase/database";

import { rtdb } from "@/firebase";

export default {
  async addMember({ boardId }, body) {
    const { name } = body;
    const fullBody = { name, createdDate: new Date().getTime() };

    const boardIdRef = ref(rtdb, `members/${boardId}`);
    const newNoteRef = push(boardIdRef);
    await set(newNoteRef, fullBody);
    return {
      id: newNoteRef.key,
      ...fullBody,
    };
  },
  listenMemberChange({ boardId }, listenerFn) {
    const membersRef = ref(rtdb, `members/${boardId}`);
    onValue(membersRef, (snapshot) => {
      let docs = [];
      snapshot.forEach((childSnapshot) => {
        docs.push({ id: childSnapshot.key, ...childSnapshot.val() });
      });
      listenerFn(docs);
    });
  },
};
