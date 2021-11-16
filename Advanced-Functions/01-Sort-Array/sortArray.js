function sort(inputArr, order){
    let output = [];
    if(order == 'asc'){
        output = inputArr.sort((a, b) => a - b);
    } else {
        output = inputArr.sort((a, b) => b - a)
    }

    return inputArr;
}

console.log(sort([14, 7, 17, 6, 8], 'asc'));