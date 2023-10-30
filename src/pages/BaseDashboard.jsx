import BaseIcon from "../components/BaseIcon";
import { ICONS } from "../helpers/constant";
import { useRef } from "react";
import BaseForm from "./FormInput";

export default function BaseDashBoard() {
  // const [isOpen, setIsOpen] = useState(false);
  // const openModal = () => {
  //   setIsOpen(true);
  // };

  // const closeModal = () => {
  //   setIsOpen(false);
  // };

  const nameRef = useRef();
  const closeForm = (e) => {
    console.log("event", e);
  };

  const addDashBoard = () => {
    console.log("addDashBoard called");
  };

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

  return (
    <div>
      <h1 className="text-2xl font-bold text-neutral-600">Dashboard</h1>
      <div className=" flex  py-4 ">
        <BaseForm>
          <button
            type="button"
            className="border-2 border-neutral-600 hover:border-blue-500 hover:text-blue-500 border-dashed h-40 w-60 flex flex-col gap-1 justify-center items-center rounded-md"
          >
            <div className=" bg-[#C0C0D4] rounded-full px-2 py-2">
              <BaseIcon
                iconName={ICONS.Plus}
                className=" flex h-6 w-6 text-white"
              ></BaseIcon>
            </div>
            <h1 className="text-sm">Add boards</h1>
          </button>
        </BaseForm>
      </div>
    </div>
  );
}
