import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import BaseFirstChar from "@/components/BaseFirstChar";
import BaseIcon from "@/components/BaseIcon";
import BaseButton from "@/components/BaseButton";
import memberService from "@/services/member.service";
import pokerService from "@/services/poker.service";
import { ICONS } from "@/helpers/constant";
import { getBoardMemberLocalStorage } from "@/utils/common.util";
import BoardContext from "@/contexts/BoardContext";

export default function ScrumPoker() {
  const params = useParams();
  const { board } = useContext(BoardContext);
  const [members, setMembers] = useState([]);
  const [memberVoteMap, setMemberVoteMap] = useState({});
  const [pokerUIState, setPokerUIState] = useState({});
  const storedMember = getBoardMemberLocalStorage({ boardId: params.boardId });
  const points = ["?", 0, 0.5, 1, 2, 3, 5, 8, 13, 20, 40, 100];

  function listenMemberChange() {
    memberService.listenMemberChange({ boardId: params.boardId }, (docs) => {
      if (docs && Array.isArray(docs)) {
        setMembers(docs);
      }
    });
  }

  function listenPokerStateChange() {
    pokerService.listenPokerStateChange({ boardId: params.boardId }, (doc) => {
      if (doc) {
        setPokerUIState(doc);
      }
    });
  }

  async function updatePokerState() {
    await pokerService.updatePokerState(
      { boardId: params.boardId },
      {
        ...pokerUIState,
        show: !pokerUIState.show,
      }
    );
  }

  function listenVoteChange() {
    pokerService.listenVoteChange({ boardId: params.boardId }, (docs) => {
      if (docs && Array.isArray(docs)) {
        const votesMap = docs.reduce((accum, item) => {
          accum[item.memberId] = item;
          return accum;
        }, {});
        setMemberVoteMap(votesMap);
      }
    });
  }

  const resetScrumPoker = async () => {
    try {
      await pokerService.deleteAllPokerVote({
        boardId: params.boardId,
      });
      await pokerService.updatePokerState(
        { boardId: params.boardId },
        {
          ...pokerUIState,
          show: false,
        }
      );
      toast.success("Scrum Poker reset successfully.");
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    listenMemberChange();
    listenVoteChange();
    listenPokerStateChange();
  }, []);

  const handlePokerCardClick = async (point) => {
    try {
      if (memberVoteMap[storedMember.id]?.point) {
        const { id: voteId } = memberVoteMap[storedMember.id];
        await pokerService.updatePokerVote(
          { boardId: params.boardId, voteId },
          {
            point:
              memberVoteMap[storedMember.id]?.point === point ? null : point,
            memberId: storedMember.id,
          }
        );
      } else {
        await pokerService.pokerVote(
          { boardId: params.boardId },
          {
            point,
            memberId: storedMember.id,
          }
        );
      }
    } catch (error) {
      toast.error(error.message);
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
                    className={`flex items-center justify-center text-white h-48 w-32 text-2xl rounded-md ${
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
                {board?.owner == storedMember.id && (
                  <BaseButton theme="SECONDARY" onClick={updatePokerState}>
                    {pokerUIState.show ? "Hide" : "Show"}
                  </BaseButton>
                )}
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
                    {pokerUIState.show ? (
                      <span className="flex items-center justify-center h-12 w-10 text-xl font-medium bg-white rounded-xl text-zinc-800">
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
              <div className="flex flex-col mt-12 mb-3">
                <BaseButton theme="DANGER" onClick={resetScrumPoker}>
                  Reset All
                </BaseButton>
              </div>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
