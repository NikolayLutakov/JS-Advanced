function sorting(arr) {
    
    arr.sort((a, b) => a - b);
    const output = [];

    if (arr.length == 1) {
        return arr;
    }

    for (let i = 0; i < arr.length / 2; i++) {
        output.push(arr[i]);
        if (arr.length % 2 != 0) {
            if (i != Math.ceil(arr.length / 2) - 1) {
                output.push(arr[arr.length - 1 - i])
            }
        } else {
            output.push(arr[arr.length - 1 - i])
        }
    }

    return output;
}

console.log(sorting([1, 65, 3, 52, 48, 63, 31, -3, 18, 56, 100]));

// cool solution from colleague

function sortNumbers(arr) {
    let count = 1;
    let result = [];
    let sorted = arr.sort((a, b) => a - b);
    while (sorted.length > 0) {
        if (count % 2 !== 0) {
            result.push(sorted.shift());
        } else {
            result.push(sorted.pop());
        }
        count++;
    }
    return result;
}