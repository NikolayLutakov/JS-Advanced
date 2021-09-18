function solve(input) {
    const matrix = readInput(input);
    const checkDiagonalsResult = checkDiagonlSums(matrix);

    if (!checkDiagonalsResult) {
        printMatrix(matrix);
        return;
    }

    fuillSums(checkDiagonalsResult, matrix);
    printMatrix(matrix);

    return;

    function fuillSums(sum, mtx) {
        let forbiddenIndexes = [];

        for (let row = 0; row < mtx.length; row++) {

            forbiddenIndexes.push(`${row} ${row}`);
            forbiddenIndexes.push(`${mtx.length - 1 - row} ${row}`);

        }

        for (let row = 0; row < mtx.length; row++) {
            for (let col = 0; col < mtx[row].length; col++) {
                let element = `${row} ${col}`;

                if (!forbiddenIndexes.includes(element)) {
                    mtx[row][col] = sum;
                }
            }
        }
    }


    function checkDiagonlSums(mtx) {
        let diagonal1 = [];
        let diagonal2 = [];

        for (let row = 0; row < mtx.length; row++) {
            diagonal1.push(mtx[row][row]);
            diagonal2.push(mtx[mtx.length - 1 - row][row]);
        }

        d1Sum = diagonal1.reduce(function sum(acc, val) { return acc + val }, 0);
        d2Sum = diagonal2.reduce(function sum(acc, val) { return acc + val }, 0);

        if (d1Sum != d2Sum) {
            return false;
        }

        return d1Sum;
    }

    function printMatrix(mtx) {
        for (let i = 0; i < mtx.length; i++) {
            console.log(mtx[i].join(' '));
        }
    }

    function readInput(input) {
        let mtx = [];
        for (element of input) {
            let row = element.split(' ').map(a => parseInt(a));
            mtx.push(row);
        }
        return mtx;
    }

}

solve(['5 3 12 3 1',
    '11 4 23 2 5',
    '101 12 3 21 10',
    '1 4 5 2 2',
    '5 22 33 11 1']
);

solve(['1 1 1',
    '1 1 1',
    '1 1 0']);