import BoardContext from "@/contexts/BoardContext";
import { useState } from "react";
import boardService from "@/services/board.service";

export default function BoardProvider({ children }) {
  const [board, setBoard] = useState({});

  const reFetchBoard = async ({ boardId }) => {
    const boardResult = await boardService.getBoard({ boardId });
    if (boardResult && boardResult.id) {
      setBoard(boardResult);
    }
  };

  return (
    <BoardContext.Provider
      value={{
        board,
        setBoard,
        reFetchBoard,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
}
