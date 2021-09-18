function printElement(arr, n){
    const output = [];
    for(let i = 0; i < arr.length; i += n){
        output.push(arr[i]);
    }

    return output;
}

console.log(printElement(['5', 
'20', 
'31', 
'4', 
'20'], 
2));

console.log(printElement(['dsa',
'asd', 
'test', 
'tset'], 
2
));

console.log(printElement(['1', 
'2',
'3', 
'4', 
'5'], 
6
));