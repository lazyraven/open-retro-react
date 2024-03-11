import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import memberService from "@/services/member.service";
import BaseFirstChar from "@/components/BaseFirstChar";

export default function Members() {
  const params = useParams();
  const [members, setMembers] = useState([]);

  async function getMembers() {
    try {
      const members = await memberService.getMembers({
        boardId: params.boardId,
      });
      if (members && Array.isArray(members)) {
        setMembers(members);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    getMembers();
  }, []);

  return (
    <>
      <div className="flex flex-col my-4">
        <div className="flex">
          <ul className="flex flex-wrap gap-3 items-center">
            {members.map((member, index) => (
              <li
                className="flex items-center justify-between text-white px-4 py-4 shadow-lg bg-zinc-800 rounded-md"
                key={"member" + index}
              >
                <div className="flex gap-2 items-center">
                  <BaseFirstChar word={member?.name} size="XL"></BaseFirstChar>
                  <span>{member.name}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
