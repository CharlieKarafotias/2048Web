// Board logic
function isCombinable(a: number | null, b: number | null): boolean {
    if (a !== null && b !== null) {
        return a === b;
    } else {
        return false;
    }
}

function nextNumber(a: number): number {
    return a * 2;
}

function hasWon(board: (number | null)[]): boolean {
    return board.includes(2048);
}

// Game logic
export function initialBoard(): (number | null)[] {
    let initial_board: (number | null)[] = Array(16).fill(null);
    // generate 2 numbers 
    let num_1 = Math.floor(Math.random() * 16);
    let num_2 = Math.floor(Math.random() * 16);
    while (num_1 === num_2) {
        num_2 = Math.floor(Math.random() * 16);
    }
    initial_board[num_1] = 2;
    initial_board[num_2] = 2;
    return initial_board;
}

function spawn_new_number_block(board: (number | null)[]): (number | null)[] {
    let available_spots: number[] = [];
    board.forEach((elem, idx) => {
        if (elem === null) {
            available_spots.push(idx);
        }
    });

    if (available_spots.length > 0) {
        let idx_on_board_to_update = Math.floor(Math.random() * available_spots.length);
        board[available_spots[idx_on_board_to_update]] = 2;
    }
    return board;
}

function fill_deleted(row: (number | null)[], pad = 4, insert_in_front = false): (number | null)[] {
    let padded = [...row];
    while (padded.length !== pad) {
        if (insert_in_front) {
            padded.unshift(null);
        } else {
            padded.push(null);
        }
    }
    return padded;
}

function shift_row(row: (number | null)[], l_to_r: boolean): (number | null)[] {
    console.log('shift row');
    let updated_row = row.filter(x => x !== null);
    let done = false;

    if (l_to_r) {
        let i = updated_row.length - 1;
        while (!done && i >= 1) {
            let curr = updated_row[i];
            let prev = updated_row[i - 1];
            if (isCombinable(prev, curr)) {
                updated_row[i] = nextNumber(curr!);
                updated_row.splice(i - 1, 1);
                done = true;
            }
            i -= 1;
        }

        return fill_deleted(updated_row, 4, true);
    } else {
        let i = 0;
        while (!done && i + 1 < updated_row.length) {
            let curr = updated_row[i];
            let next = updated_row[i + 1];
            if (isCombinable(curr, next)) {
                updated_row[i] = nextNumber(curr!);
                updated_row.splice(i + 1, 1);
                done = true;
            }
            i += 1;
        }
        return fill_deleted(updated_row, 4, false);
    }
}

function transpose<T>(array: T[][]): T[][] {
    return array[0].map((_, colIndex) => array.map(row => row[colIndex]));
}

function flatten<T>(arr: T[][]): T[] {
    return ([] as T[]).concat(...arr);
}

export function player_move(board: (number | null)[], input: string): (number | null)[] {
    let rows: (number | null)[][] = [[], [], [], []];
    let columns: (number | null)[][] = [[], [], [], []];
    switch (input.toLowerCase()) {
        case 'up':
            board.forEach((elem, idx) => {
                columns[idx % columns.length].push(elem);
            });
            // shift columns
            columns = columns.map(r => shift_row(r, false));
            // update board
            board = flatten(transpose(columns));
            break;
        case 'down':
            board.forEach((elem, idx) => {
                columns[idx % columns.length].push(elem);
            });
            // shift columns
            columns = columns.map(r => shift_row(r, true));
            // update board
            board = flatten(transpose(columns));
            break;
        case 'left':
            board.forEach((elem, idx) => {
                rows[Math.floor(idx / rows.length)].push(elem);
            });
            // shift rows
            rows = rows.map(r => shift_row(r, false));
            // update board
            board = flatten(rows);
            break;
        case 'right':
            board.forEach((elem, idx) => {
                rows[Math.floor(idx / rows.length)].push(elem);
            });
            // shift rows
            rows = rows.map(r => shift_row(r, true));
            // update board
            board = flatten(rows);
            break;
    }
    return spawn_new_number_block(board);
}

