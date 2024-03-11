import { ref, push, set, onValue } from "firebase/database";

import { rtdb } from "@/firebase";

export default {
  createRetroNotes({ retroId }, body) {
    const retrosRef = ref(rtdb, `retros/${retroId}`);
    const newNoteRef = push(retrosRef);
    return set(newNoteRef, body);
  },
  listenRetroNotesChange({ retroId }, listenerFn) {
    const retrosRef = ref(rtdb, `retros/${retroId}`);
    onValue(retrosRef, (snapshot) => {
      let docs = [];
      snapshot.forEach((childSnapshot) => {
        docs.push({ id: childSnapshot.key, ...childSnapshot.val() });
      });
      listenerFn(docs);
    });
  },
};
