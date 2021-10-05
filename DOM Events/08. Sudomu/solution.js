function solve() {
    const table = document.querySelector('table')
    const outputElement = document.getElementById('check').children[0];
    const checkBtn = document.querySelectorAll('button')[0];
    const clearBtn = document.querySelectorAll('button')[1];

    checkBtn.addEventListener('click', check);
    clearBtn.addEventListener('click', clear);

    function check(){
        const rows = Array.from(table.querySelectorAll('tbody tr'));
        const field = [];
     
        for(const row of rows){
            const rowArr = [];
            for(const td of row.children){
                rowArr.push(Number(td.children[0].value))
            }
            field.push(rowArr);
        }

        const row0 = [field[0][0], field[0][1], field[0][2]];
        const row1 = [field[1][0], field[1][1], field[1][2]];
        const row2 = [field[2][0], field[2][1], field[2][2]];
        const col0 = [field[0][0], field[1][0], field[2][0]];
        const col1 = [field[0][1], field[1][1], field[2][1]];
        const col2 = [field[0][2], field[1][2], field[2][2]];

        const numbersArr = [row0, row1, row2,col0, col1, col2];
        const sums = [];
        for(const element of numbersArr){
            let sum = element.reduce((a, e) => a + e);
            sums.push(sum);
        }

        if(sums.some(v => v != 6)){
            table.style.border = '2px solid red'
            outputElement.textContent = 'NOP! You are not done yet...';
            outputElement.style.color = 'red';
        } else {
            table.style.border = '2px solid green'
            outputElement.textContent = 'You solve it! Congratulations!';
            outputElement.style.color = 'green';
        }
    }

    function clear() {
        table.style.border = 'none'
        Array.from(table.querySelectorAll('tbody tr td input'))
            .map(x => { x.value = '' });
        outputElement.textContent = '';
    }
}

// function solve() {
//     let check = document.querySelectorAll('button')[0];
//     let clear = document.querySelectorAll('button')[1];
//     let cells = Array.from(document.querySelectorAll('tbody input'));
//     let table = document.querySelector('table');
//     let solved = document.querySelector('#check p');
//     let flag = true;

//     check.addEventListener('click', function (e) {

//         let row1 = new Set();
//         row1.add(cells[0].value);
//         row1.add(cells[1].value);
//         row1.add(cells[2].value);
//         let row2 = new Set();
//         row2.add(cells[3].value);
//         row2.add(cells[4].value);
//         row2.add(cells[5].value);
//         let row3 = new Set();
//         row3.add(cells[6].value);
//         row3.add(cells[7].value);
//         row3.add(cells[8].value);

//         let col1 = new Set();
//         col1.add(cells[0].value);
//         col1.add(cells[3].value);
//         col1.add(cells[6].value);
//         let col2 = new Set();
//         col2.add(cells[1].value);
//         col2.add(cells[4].value);
//         col2.add(cells[7].value);
//         col3 = new Set();
//         col3.add(cells[2].value);
//         col3.add(cells[5].value);
//         col3.add(cells[8].value);

//         result = [row1, row2, row3, col1, col2, col3];
//         result.forEach(el => {
//             if (el.size !== 3) {
//                 table.style.border = '2px solid red';
//                 solved.textContent = 'NOP! You are not done yet...';
//                 solved.style.color = 'red';
//                 flag = false;
//             }
//         });
//         if (flag) {
//             table.style.border = '2px solid green';
//             solved.textContent = 'You solve it! Congratulations!';
//             solved.style.color = 'green';
//         }
//         flag = true;
//     });

//     clear.addEventListener('click', (e) => {
//         cells.forEach(cell => cell.value = '');
//         table.style.border = 'none';
//         solved.textContent = '';
//     })
// }