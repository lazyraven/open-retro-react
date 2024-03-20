import {
  ref,
  push,
  set,
  update,
  onValue,
  query,
  orderByChild,
} from "firebase/database";

import { rtdb } from "@/firebase";

export default {
  createRetroNotes({ retroId }, body) {
    const notesRef = ref(rtdb, `notes/${retroId}`);
    const newNoteRef = push(notesRef);
    return set(newNoteRef, body);
  },
  async updateRetroNote({ retroId, noteId }, body) {
    const { description } = body;
    const updates = {};
    updates[`notes/${retroId}/${noteId}/description`] = description;
    const rtdbRef = ref(rtdb);
    await update(rtdbRef, updates);
    return body;
  },
  async updateRetroVote({ retroId, noteId }, { vote }) {
    const updates = {};
    updates[`notes/${retroId}/${noteId}/vote`] = vote;
    const rtdbRef = ref(rtdb);
    await update(rtdbRef, updates);
    return vote;
  },
  async deleteRetroNote({ retroId, noteId }) {
    const updates = {};
    updates[`notes/${retroId}/${noteId}`] = null;
    const rtdbRef = ref(rtdb);
    await update(rtdbRef, updates);
    return noteId;
  },

  listenRetroNotesChange({ retroId }, listenerFn) {
    const notesRef = query(
      ref(rtdb, `notes/${retroId}`)
      // orderByChild("createdDate", "desc")
    );
    onValue(notesRef, (snapshot) => {
      let docs = [];
      snapshot.forEach((childSnapshot) => {
        docs.push({ id: childSnapshot.key, ...childSnapshot.val() });
      });
      listenerFn(docs);
    });
  },
};
