"use client"
import { useRef, useEffect, useState } from "react";
import Box from "./Box";
import { startGame, updateBoard } from "../actions";

export default function Board() {
  const [board, setBoard] = useState(Array(16).fill(null));
  const [score, setScore] = useState(0);

  const ref = useRef(null);

  useEffect(() => {
    async function setupGame() {
      const res = await startGame()
      setBoard(res.board);
    }
    setupGame();
  }, []);
  // useEffect(() => {
  //     async function update() {
  //       const newBoard = await updateBoard({
  //         board,
  //         direction: 'up',
  //       });
  //       if (newBoard.errors) {
  //         console.error('failed to update board:', newBoard.errors);
  //       } else {
  //         console.log(newBoard.board);
  //         // setBoard(newBoard.board);
  //       }
  //     }
  //     update();
  //   }, []);

  return (
    <div className="grid grid-cols-4 gap-4">
      {board.map((v, idx) => <Box key={idx} value={v} />)}
    </div>
  )
}