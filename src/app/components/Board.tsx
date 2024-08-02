"use client"
import { useCallback, useEffect, useState } from "react";
import Box from "./Box";
import { startGame, updateBoard } from "../actions";

export default function Board() {
  const [board, setBoard] = useState(Array(16).fill(null));
  const [score, setScore] = useState(0);

  useEffect(() => {
    async function setupGame() {
      const res = await startGame()
      setBoard(res.board);
    }
    setupGame();
  }, []);

  const handleUserKeyPress = useCallback((event: { key: any; keyCode: any; }) => {
    async function renderNewBoard(direction: string) {
      console.log('sending board', board);
      const newBoard = await updateBoard({
        board,
        direction,
      });
      if (newBoard.errors) {
        console.error('failed to update board:', newBoard.errors);
      } else {
        console.log('logging board', board);
        setBoard(newBoard.board);
      }
    }

    const { keyCode } = event;
    switch (keyCode) {
      case 38:
        console.log("up");
        renderNewBoard('up');
        break;
      case 40:
        console.log("down");
        renderNewBoard('down');
        break;
      case 37:
        console.log("left");
        renderNewBoard('left');
        break;
      case 39:
        console.log("right");
        renderNewBoard('right');
        break;
    }
  }, [board]);

  useEffect(() => {
    window.addEventListener("keydown", handleUserKeyPress);
    return () => {
      window.removeEventListener("keydown", handleUserKeyPress);
    };
  }, [handleUserKeyPress]);

  return (
    <div className="grid grid-cols-4 gap-4">
      {board.map((v, idx) => <Box key={idx} value={v} />)}
    </div>
  )
}