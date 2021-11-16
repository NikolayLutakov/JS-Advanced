function solve(input){
    let cars = {};

    for(const entry of input){
        let tokens = entry.split(' | ');
        let brand = tokens[0];
        let model = tokens[1];
        let count = Number(tokens[2]);

        if(!cars.hasOwnProperty(brand)){
            let brandAndmodel = {};
            brandAndmodel[model] = count;
            cars[brand] = brandAndmodel;
        } else if (!cars[brand].hasOwnProperty(model)){
            cars[brand][model] = count;
        } else {
            cars[brand][model] += count;
        }
    }
    let result = '';
    for (const brand in cars) {
        result += brand + '\n';
        for (const model in cars[brand]) {
            result += `###${model} -> ${cars[brand][model]}\n`;
        }
    }

    return result
}

console.log(solve(['Audi | Q7 | 1000',
'Audi | Q6 | 100',
'BMW | X5 | 1000',
'BMW | X6 | 100',
'Citroen | C4 | 123',
'Volga | GAZ-24 | 1000000',
'Lada | Niva | 1000000',
'Lada | Jigula | 1000000',
'Citroen | C4 | 22',
'Citroen | C5 | 10']
))