import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BaseFirstChar from "@/components/BaseFirstChar";
import BaseIcon from "@/components/BaseIcon";
import BaseButton from "@/components/BaseButton";
import memberService from "@/services/member.service";
import { ICONS } from "@/helpers/constant";
import { getLocalStorage } from "@/utils/common.util";

export default function ScrumPoker() {
  const points = ["?", 0, 0.5, 1, 2, 3, 5, 8, 13, 20, 40, 100];
  const storedMember = getLocalStorage("member");

  const params = useParams();
  const [members, setMembers] = useState([]);
  const [memberVoteMap, setMemberVoteMap] = useState({});
  const [showPoints, setShowPoints] = useState(false);

  function listenMemberChange() {
    memberService.listenMemberChange({ boardId: params.boardId }, (docs) => {
      if (docs && Array.isArray(docs)) {
        setMembers(docs);
      }
    });
  }

  function listenVoteChange() {
    memberService.listenVoteChange({ boardId: params.boardId }, (docs) => {
      if (docs && Array.isArray(docs)) {
        const votesMap = docs.reduce((accum, item) => {
          accum[item.memberId] = item;
          return accum;
        }, {});
        setMemberVoteMap(votesMap);
      }
    });
  }

  useEffect(() => {
    listenMemberChange();
    listenVoteChange();
  }, []);

  const handlePokerCardClick = async (point) => {
    try {
      const voteResult = await memberService.pokerVote(
        { boardId: params.boardId },
        {
          point: memberVoteMap[storedMember.id]?.point === point ? null : point,
          memberId: storedMember.id,
        }
      );
      console.log(`voteResult`, voteResult);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex flex-col my-4">
        <div className="grid grid-cols-1 md:grid-cols-8 gap-3">
          <div className="col-span-1 md:col-span-5 flex flex-col">
            <ul className="flex flex-wrap gap-3 justify-center">
              {points.map((point, index) => (
                <li
                  className="flex relative"
                  key={"scrum-point" + point + index}
                >
                  {memberVoteMap[storedMember.id]?.point === point && (
                    <BaseIcon
                      iconName={ICONS.SolidCheckCircle}
                      className="flex h-10 w-10 text-white absolute right-0"
                    ></BaseIcon>
                  )}
                  <button
                    className={`flex items-center justify-center text-white h-56 w-36 text-2xl rounded-md ${
                      memberVoteMap[storedMember.id]?.point === point
                        ? "bg-blue-800 hover:bg-blue-700"
                        : "bg-zinc-800 hover:bg-zinc-700"
                    }`}
                    onClick={() => {
                      handlePokerCardClick(point);
                    }}
                    title={
                      memberVoteMap[storedMember.id]?.point === point
                        ? "Remove Vote"
                        : "Vote"
                    }
                  >
                    {point}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-1 md:col-span-3 flex flex-col">
            <ul className="flex flex-col gap-1 p-2 items-center border border-zinc-700 rounded-md">
              <div className="flex justify-between w-full items-center p-2">
                <span className="text-zinc-300 font-medium">Members</span>
                <BaseButton
                  theme="SECONDARY"
                  onClick={() => {
                    setShowPoints(!showPoints);
                  }}
                >
                  {showPoints ? "Hide" : "Show"}
                </BaseButton>
              </div>

              {members.map((member, index) => (
                <li
                  className="flex items-center justify-between text-white w-full px-2 py-1"
                  key={"member" + index}
                >
                  <div className="flex gap-2 items-center">
                    <BaseFirstChar
                      word={member?.name}
                      size="XL"
                    ></BaseFirstChar>
                    <span>{member.name}</span>
                  </div>
                  <div className="flex justify-center items-center min-h-[4rem] basis-16">
                    {showPoints ? (
                      <span className="flex items-center justify-center h-10 w-10 text-xl font-medium bg-white rounded-full text-zinc-800">
                        {memberVoteMap[member.id]?.point}
                      </span>
                    ) : (
                      <span className="flex items-center justify-center text-5xl">
                        {memberVoteMap[member.id]?.point ? "🃏" : ""}
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
