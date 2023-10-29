import { useEffect, useRef } from "react";
import { firestore } from "../firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";

export default function FirebaseTest() {
  const messageRef = useRef();
  const messageCollection = collection(firestore, "messages");

  const getRetros = async () => {
    try {
      // addDoc(ref, data);
      const querySnapshot = await getDocs(collection(firestore, "retros"));
      console.log(`querySnapshot`);
      console.log(querySnapshot);

      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} =>`);

        console.log(doc.data());
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getRetros();
  });

  const handleSave = async (e) => {
    e.preventDefault();
    // console.log("handled", e);
    // console.log(messageRef.current.value);
    let data = {
      message: messageRef.current.value,
    };
    try {
      addDoc(messageCollection, data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      Welcome Home !!
      <form action="" onSubmit={handleSave}>
        <label>Enter Message</label>
        <input type="text" ref={messageRef} />
        <button type="submit">Save</button>
      </form>
    </div>
  );
}
