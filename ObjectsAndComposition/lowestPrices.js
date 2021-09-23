function find(input){
    const towns = {};
    const result = {};
    for(const row of input){
        const tokens = row.split(' | ');
        if(towns[tokens[0]] == undefined){
            towns[tokens[0]] = {};
        }
        
        const town = towns[tokens[0]];

        town[tokens[1]] = tokens[2];
    }

    for(const town in towns){      
        for(const product in towns[town]){
           const price = Number(towns[town][product]);
            if(result[product] == undefined){
                result[product] = {};
                result[product].price = price;
                result[product].town = town;
            }

            if(result[product].price > price){
                 result[product].price = price;
                 result[product].town = town;
             }
        }
    }

    for(const product in result){  
        console.log(`${product} -> ${result[product].price} (${result[product].town})`);
    }
}

find(['Sample Town | Sample Product | 1000',
'Sample Town | Orange | 2',
'Sample Town | Peach | 1',
'Sofia | Orange | 3',
'Sofia | Peach | 2',
'New York | Sample Product | 1000.1',
'New York | Burger | 10']
);

find(['Sofia City | Audi | 100000',
    'Sofia City | BMW | 100000',
    'Sofia City | Mitsubishi | 10000',
    'Sofia City | Mercedes | 10000',
    'Sofia City | NoOffenseToCarLovers | 0',
    'Mexico City | Audi | 1000',
    'Mexico City | BMW | 99999',
    'New York City | Mitsubishi | 10000',
    'New York City | Mitsubishi | 1000',
    'Mexico City | Audi | 100000',
    'Washington City | Mercedes | 1000',
    ]);