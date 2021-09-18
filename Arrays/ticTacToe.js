function solve(moves) {

    play(moves);

    function play(moves) {
        const board = [[false, false, false], [false, false, false], [false, false, false]];
        const moveCounter = {
            counter: 0
        }

        while (moves.length > 0) {
            let move = moves.shift();
            if (makeMove(move, board, moveCounter)) {
                printBoard(board);
                return;
            }
            if (!checkFreePositions(board)) {
                console.log('The game ended! Nobody wins :(');
                printBoard(board);
                return true;
            }

        }
    }

    function makeMove(move, board, cnt) {
        let coordinates = move.split(' ').map(a => parseInt(a));
        let playerMark = 'X';

        if (cnt.counter % 2 != 0) {
            playerMark = 'O';
        }

        if (!isMoveValid(coordinates, board)) {
            console.log('This place is already taken. Please choose another!')
            return false;
        };

        board[coordinates[0]][coordinates[1]] = playerMark;

        if (checkWin(board, playerMark)) {
            console.log(`Player ${playerMark} wins!`);
            return true;
        }

        cnt.counter += 1;

        return false;
    }

    function isMoveValid(coordinates, board) {
        if (board[coordinates[0]][coordinates[1]] != false) {
            return false;
        }

        return true;
    }

    function checkWin(board, playerMark) {
        let diagonal1 = [];
        let diagonal2 = [];
        let col1 = [];
        let col2 = [];
        let col3 =[];
        
        for (let row = 0; row < board.length; row++) {
            if (board[row].every(a => a == playerMark)) {
                
                return true;
            }

            col1.push(board[row][0]);
            col2.push(board[row][1]);
            col3.push(board[row][2]);

            diagonal1.push(board[row][row]);
            diagonal2.push(board[board.length - 1 - row][row]);
        }

        if (diagonal1.every(a => a == playerMark) 
                || diagonal2.every(a => a == playerMark) 
                || col1.every(a => a == playerMark)
                || col2.every(a => a == playerMark)
                || col3.every(a => a == playerMark)) {
            return true;
        }

        return false;
    }

    function checkFreePositions(board) {
        for (let row = 0; row < board.length; row++) {
            if (board[row].some(a => a == false)) {
                return true;
            }
        }

        return false;
    }

    function printBoard(board) {
        console.log(board[0].join('\t'));
        console.log(board[1].join('\t'));
        console.log(board[2].join('\t'));
    }
}

solve(["0 1", "0 0", "0 2", "2 0", "1 0", "1 1", "1 2", "2 2", "2 1", "0 0"]);

solve(["0 0", "0 0", "1 1", "0 1", "1 2", "0 2", "2 2", "1 2", "2 2", "2 1"]);

solve(["0 1", "0 0", "0 2", "2 0", "1 0", "1 2", "1 1", "2 1", "2 2", "0 0"]);

solve(["0 1", "0 0", "2 1", "2 0", "1 0", "1 1", "1 2", "0 2", "2 1", "0 0"]);

solve(["0 0", "0 1", "1 0", "1 1", "2 0", "1 1", "1 2", "0 2", "2 1", "0 0"]);