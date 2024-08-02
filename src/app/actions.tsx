'use server'

import { z } from 'zod';
import { player_move, initialBoard } from './gamelogic';

const schema = z.object({
    board: z.array(z.number().nullable()).length(16),
    direction: z.enum(['up', 'down', 'left', 'right'])
});

export async function updateBoard(data: any) {
    const validatedFields = schema.safeParse(data);
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }
    // Do logic and return
    const newBoard = player_move(validatedFields.data.board, validatedFields.data.direction);
    return {
        board: newBoard,
    }
}

export async function startGame() {
    // Do logic and return
    const newBoard = initialBoard();
    return {
        board: newBoard,
    }
}