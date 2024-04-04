import { ref, update, onValue } from "firebase/database";

import { rtdb } from "@/firebase";

export default {
  async clearStopwatchState({ boardId }) {
    const updates = {};
    updates[`stopwatch-state/${boardId}`] = {
      startTime: null,
      runtime: null,
    };
    const rtdbRef = ref(rtdb);
    await update(rtdbRef, updates);
    return {};
  },

  async updateStopwatch({ boardId }, body) {
    const { startTime, runtime } = body;
    const updates = {};
    updates[`stopwatch-state/${boardId}`] = {
      startTime,
      runtime,
    };
    const rtdbRef = ref(rtdb);
    await update(rtdbRef, updates);
    return body;
  },

  listenStopwatchStateChange({ boardId }, listenerFn) {
    const stopwatchRef = ref(rtdb, `stopwatch-state/${boardId}`);
    onValue(stopwatchRef, (snapshot) => {
      listenerFn(snapshot.val());
    });
  },
};
