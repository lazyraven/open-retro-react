import { ref, push, set, update, onValue } from "firebase/database";

import { rtdb } from "@/firebase";

export default {
  async pokerVote({ boardId }, body) {
    const { memberId, point } = body;
    const fullBody = {
      memberId,
      point,
      createdDate: new Date().getTime(),
    };
    const votesRef = ref(rtdb, `votes/${boardId}`);
    const newVoteRef = push(votesRef);
    await set(newVoteRef, fullBody);
    return {
      id: newVoteRef.key,
      ...fullBody,
    };
  },

  async updatePokerVote({ boardId, voteId }, body) {
    const { point } = body;
    const updates = {};
    updates[`votes/${boardId}/${voteId}/point`] = point;
    const rtdbRef = ref(rtdb);
    await update(rtdbRef, updates);
    return body;
  },

  async deleteAllPokerVote({ boardId }) {
    const updates = {};
    updates[`votes/${boardId}`] = {};
    const rtdbRef = ref(rtdb);
    await update(rtdbRef, updates);
    return {};
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

  async updatePokerState({ boardId }, body) {
    const { show } = body;
    const updates = {};
    updates[`poker-state/${boardId}`] = {
      show,
    };
    const rtdbRef = ref(rtdb);
    await update(rtdbRef, updates);
    return body;
  },

  listenPokerStateChange({ boardId }, listenerFn) {
    const pokerStateRef = ref(rtdb, `poker-state/${boardId}`);
    onValue(pokerStateRef, (snapshot) => {
      listenerFn(snapshot.val());
    });
  },
};
