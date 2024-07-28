"use client"
import { useState } from "react";
import Box from "./Box";

export default function Board() {
    const [board, setBoard] = useState(Array(16).fill(null));
    return (
        <div className="grid grid-cols-4 gap-4">
            {board.map(v => <Box value={v} />)}
        </div>
    )
}