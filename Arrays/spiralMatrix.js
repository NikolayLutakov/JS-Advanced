function solve(r, c) {

    const matrix = [];

    for (let i = 0; i < r; i++) {
        matrix.push([]);
    }

    let counter = 1;
    let startColumn = 0;
    let endColumn = r - 1;
    let startRow = 0;
    let endRow = r - 1;

    while (startColumn <= endColumn && startRow <= endRow) {

        // Top row
        for (let i = startColumn; i <= endColumn; i++) {
            matrix[startRow][i] = counter;
            counter++;
        }
        startRow++;

        // Right column
        for (let i = startRow; i <= endRow; i++) {
            matrix[i][endColumn] = counter;
            counter++;
        }
        endColumn--;

        // Bottom row
        for (let i = endColumn; i >= startColumn; i--) {
            matrix[endRow][i] = counter;
            counter++;
        }
        endRow--;

        // start column
        for (let i = endRow; i >= startRow; i--) {
            matrix[i][startColumn] = counter;
            counter++;
        }
        startColumn++;
    }

    for (let row = 0; row < matrix.length; row++) {
        console.log(matrix[row].join(' '));
    }
}

solve(5, 5);
solve(3, 3);