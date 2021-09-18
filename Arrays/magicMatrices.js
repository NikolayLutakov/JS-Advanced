function checkMatrix(matrix) {

    let sums = []

    for (let row = 0; row < matrix.length; row++) {
        sums.push(matrix[row].reduce(function sum(acc, val) { return acc + val }, 0));
        let colSum = 0;
        for (let col = 0; col < matrix[row].length; col++) {
            colSum += parseFloat(matrix[row, col]);
        }
        sums.push(colSum);
    }

    if (sums.some(function diff(element) { return element != sums[0] })) {
        return false;
    }

    return true;

}

console.log(checkMatrix([[4, 5, 6],
[6, 5, 4],
[5, 5, 5]]));

console.log(checkMatrix([[11, 32, 45],
[21, 0, 1],
[21, 1, 1]]));

console.log(checkMatrix([[1, 0, 0],
[0, 0, 1]]));

