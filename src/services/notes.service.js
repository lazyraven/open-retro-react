import { ref, push, set, onValue } from "firebase/database";

import { rtdb } from "@/firebase";

export default {
  createRetroNotes({ retroId }, body) {
    const retroIdRef = ref(rtdb, `retros/${retroId}`);
    const newNoteRef = push(retroIdRef);
    return set(newNoteRef, body);
  },
  listenRetroNotesChange({ retroId }, listenerFn) {
    const retroIdRef = ref(rtdb, `retros/${retroId}`);
    onValue(retroIdRef, (snapshot) => {
      let docs = [];
      snapshot.forEach((childSnapshot) => {
        docs.push({ id: childSnapshot.key, ...childSnapshot.val() });
      });
      listenerFn(docs);
    });
  },
};
