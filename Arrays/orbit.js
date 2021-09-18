function solve(input) {
    const rows = input[0];
    const cols = input[1];
    const field = [];
    const target = [input[2], input[3]];

    for (let row = 0; row < rows; row++) {
        c = [];
        for (let col = 0; col < cols; col++) {
            c.push(0);
        }
        
        field.push(c);
    }   

    for (let row = 0; row < field.length; row++) {
        for (let col = 0; col < field[0].length; col++){
            let rowDiff = Math.abs(row - target[0]);
            let colDiff = Math.abs(col - target[1]);
            let value = Math.max(rowDiff, colDiff) + 1;
            
            field[row][col] = value;           
        }
    }

    for(let row = 0; row < field.length; row++){
        console.log(field[row].join(' '));
    }
}

solve([5, 5, 2, 2]);
solve([4, 4, 0, 0]);