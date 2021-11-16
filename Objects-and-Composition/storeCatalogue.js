function sort(input){
    const sorted = input.sort((a, b) => a.localeCompare(b)).map(a => a.split(' : '));
    const result = {};
    
    for(const element of sorted){
        const group = element[0][0];
        if(result[group] == undefined){
            result[group] = {};
        }
       
        const curGroup = result[group]
        curGroup[element[0]] = Number(element[1]);  
    }
    
    for(const group in result){
        console.log(group);
        for(product in result[group]){
            console.log(`  ${product}: ${result[group][product]}`)
        }
    }
}

sort(['Appricot : 20.4',
'Fridge : 1500',
'TV : 1499',
'Deodorant : 10',
'Boiler : 300',
'Apple : 1.25',
'Anti-Bug Spray : 15',
'T-Shirt : 10']
)