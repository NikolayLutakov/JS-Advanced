function extract(arr){
    let elements = [];
    let max = 0;
    for(let i = 0; i < arr.length; i++){
        let sequence = [];
        sequence.push(arr[i])
        for(let j = i; j < arr.length; j++){   
            if(arr[j] > max){
                max = arr[j]
            }
            
            if(arr[j] <= arr[j+1] && arr[j+1] >= max){
                sequence.push(arr[j+1])
            } else {
                if(elements.length < sequence.length){
                   
                    elements = sequence;
                }
            }

        }
    }
    return elements;
}

console.log(extract([1, 3, 8, 4, 10, 12, 3, 2, 24]))

console.log(extract([1, 2, 3, 4]))

console.log(extract([20, 3, 2, 15, 6, 1]))



function extractElegance(arr) {
    let output = [arr[0]];
    let max = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] >= max) {
            max = arr[i];
            output.push(max);
        }
    }

    return output;
}

console.log(extractElegance([1, 3, 8, 4, 10, 12, 3, 2, 24]))

console.log(extractElegance([1, 2, 3, 4]))

console.log(extractElegance([20, 3, 2, 15, 6, 1]))
