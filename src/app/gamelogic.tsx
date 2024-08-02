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
            let prev = updated_row[i-1];
            if (isCombinable(prev, curr)) {
                updated_row[i] = nextNumber(curr!);
                updated_row.splice(i-1, 1);
                done = true;
            }
            i -= 1;
        }
        
        return fill_deleted(updated_row, 4, true);
    } else {
        let i = 0;
        while (!done && i+1 < updated_row.length) {
            let curr = updated_row[i];
            let next = updated_row[i+1];
            if (isCombinable(curr, next)) {
                updated_row[i] = nextNumber(curr!);
                updated_row.splice(i+1, 1);
                done = true;
            }
            i += 1;
        }
        return fill_deleted(updated_row, 4, false);
    }
}

function transpose(array: any[]): any[] {
    if (Array.isArray(array[0])) {
        let transposed = Array(array[0].length).fill([]);
        let flattened = array.flat();
        flattened.forEach((elem, idx) => {
            transposed[idx % array[0].length].push(elem);
        });
        return transposed;
    } else {
        return array;
    }
}

function flatten(array: any[]): any[] {
    return array.flat();
}

export function player_move(board: (number | null)[], input: string): (number | null)[] {
    switch (input.toLowerCase()) {
        case 'up':
            let columns: (number | null)[][] = [[], [], [], []]; 
            board.forEach((elem, idx) => {
                columns[idx % columns.length].push(elem);
            });
            // shift columns
            columns = columns.map(r => shift_row(r, false));
            // update board
            board = flatten(transpose(columns));
            break;
        case 'down':
            columns = [[], [], [], []]; 
            board.forEach((elem, idx) => {
                columns[idx % columns.length].push(elem);
            });
            // shift columns
            columns = columns.map(r => shift_row(r, true));
            // update board
            board = flatten(transpose(columns));
            break;
        case 'left':
            let rows: (number | null)[][] = [[], [], [], []]; 
            board.forEach((elem, idx) => {
                rows[Math.floor(idx / rows.length)].push(elem);
            });
            // shift rows
            rows = rows.map(r => shift_row(r, false));
            // update board
            board = flatten(rows);
            break;
        case 'right':
            rows = [[], [], [], []]; 
            board.forEach((elem, idx) => {
                rows[Math.floor(idx / rows.length)].push(elem);
            });
            // shift rows
            rows = rows.map(r => shift_row(r, true));
            // update board
            board = flatten(rows);
            break;
    }
    return board;
}

// Graphics
function print_board(board: (number | null)[], split_on = 4): void {
    let rows: (number | null)[][] = [];
    let i = 0;
    while (i < board.length) {
        rows.push(board.slice(i, split_on + i));
        i += split_on;
    }
    for (let r of rows) {
        console.log(r);
    }
    console.log();
}
