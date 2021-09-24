function jsonfy(input){
    const result = [];
    const tokens = input.map(a => a.split('|').map(a => a.trim()).filter(n => n));

    for(let row = 1; row < tokens.length; row++){
        const obj = {}
        obj[tokens[0][0]] = tokens[row][0],
        obj[tokens[0][1]] = Number(Number(tokens[row][1]).toFixed(2)),
        obj[tokens[0][2]] = Number(Number(tokens[row][2]).toFixed(2)),

        result.push(obj)
    }

    return JSON.stringify(result);
}

console.log(jsonfy(['| Town | Latitude | Longitude |',
'| Sofia | 42.696552 | 23.32601 |',
'| Beijing | 39.913818 | 116.363625 |']
));