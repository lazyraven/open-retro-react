import { useEffect, useRef } from "react";
import { firestore } from "../firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";

export default function BaseForm() {
  const nameRef = useRef();

  const getRetros = async () => {
    try {
      // addDoc(ref, data);
      const querySnapshot = await getDocs(collection(firestore, "retros"));
      console.log(`querySnapshot`);
      console.log(querySnapshot);

      querySnapshot.forEach((doc) => {
        console.log("doc", doc);
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
    console.log("e", e);
    let data = {
      name: nameRef.current.value,
    };
    console.log("data", data);
    try {
      // addDoc(messageCollection, data);
    } catch (e) {
      console.log(e);
    }
  };

  const cancelEvent = (e) => {
    console.log("event", e);
  };

  return (
   
  );
}
