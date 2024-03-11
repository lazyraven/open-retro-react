import { ref, push, set, onValue } from "firebase/database";

import { rtdb } from "@/firebase";

export default {
  addMember({ boardId }, body) {
    const fullBody = { ...body, createdBy: new Date().getTime() };
    const boardIdRef = ref(rtdb, `members/${boardId}`);
    const newNoteRef = push(boardIdRef);
    set(newNoteRef, fullBody);
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

  pokerVote({ boardId }, body) {
    const { memberId, point } = body;
    const fullBody = {
      memberId,
      point,
      createdBy: new Date().getTime(),
    };
    const votesRef = ref(rtdb, `votes/${boardId}`);
    const newVoteRef = push(votesRef);
    set(newVoteRef, fullBody);
    return {
      id: newVoteRef.key,
      ...fullBody,
    };
  },

  listenVoteChange({ boardId }, listenerFn) {
    const votesRef = ref(rtdb, `votes/${boardId}`);
    onValue(votesRef, (snapshot) => {
      let docs = [];
      snapshot.forEach((childSnapshot) => {
        docs.push({ id: childSnapshot.key, ...childSnapshot.val() });
      });
      listenerFn(docs);
    });
  },
};
