function solution() {

    const ingredients = {
        protein: 0,
        carbohydrate: 0,
        fat: 0,
        flavour: 0
    }

    const recipes = {
        apple: {
            carbohydrate: 1,
            flavour: 2
        },
        lemonade: { 
            carbohydrate: 10, 
            flavour: 20 
        },
        burger: {
            carbohydrate: 5,
            fat: 7,
            flavour: 3
        },
        eggs: {
            protein: 5,
            fat: 1,
            flavour: 1
        },
        turkey: {
            protein: 10,
            carbohydrate: 10,
            fat: 10,
            flavour: 10
        }
    }

    function manage(args) {
        const commands = args.split(' ');
        const command = commands[0];
        const entity = commands[1];
        const quanity = Number(commands[2])

        const restock = () => {
            ingredients[entity] += quanity
            return 'Success';
        }

        const prepare = () => {
            const recipe = recipes[entity];
            
            for(const ing in recipe){
                if((ingredients[ing] - (recipe[ing] * quanity)) < 0){
                    return `Error: not enough ${ing} in stock`
                }
            }

            for(const ing in recipe){
                ingredients[ing] -= (recipe[ing] * quanity)     
            }
  
            return 'Success'
        }

        const report = () => {
            return `${Object.keys(ingredients)[0]}=${ingredients.protein}` +
                ` ${Object.keys(ingredients)[1]}=${ingredients.carbohydrate}` +
                ` ${Object.keys(ingredients)[2]}=${ingredients.fat}` +
                ` ${Object.keys(ingredients)[3]}=${ingredients.flavour}`
        }

        const mapper = {
            restock,
            prepare,
            report
        }
        return mapper[command]();
    }
    return manage;
}

let manager = solution();

console.log(manager('prepare turkey 1'));
console.log(manager('restock protein 10'));
console.log(manager('report'));

console.log(manager('prepare turkey 1'));
console.log(manager('restock carbohydrate 10'));
console.log(manager('report'));

console.log(manager('prepare turkey 1'));
console.log(manager('restock fat 10'));
console.log(manager('report'));

console.log(manager('prepare turkey 1'));
console.log(manager('restock flavour 10'));
console.log(manager('restock flavour 10'));
console.log(manager('restock carbohydrate 10'));
console.log(manager('report'));
console.log(manager('prepare turkey 1'));
console.log(manager('report'));
console.log(manager('prepare turkey 1'));
console.log(manager('report'));
