function store(input) {
    let juices = new Map();
    let bottles = new Map();

    input.map(j => {
        return j.split(' => ')
    }).map(r => {
        if (juices[r[0]] == undefined) {
            juices[r[0]] = Number(r[1])
        } else {
            juices[r[0]] += Number(r[1])
        }

        checkForBottles()
    })

    function checkForBottles(){
        
        for(const juice in juices){
            let checker = Math.floor(juices[juice] / 1000)
            if(checker > 0){
                if(bottles[juice] == undefined){
                    bottles[juice] = checker
                } else {
                    bottles[juice] += checker
                }
                juices[juice] -= checker * 1000
            }
        }
    }
    for(const entry in bottles){
        console.log(`${entry} => ${bottles[entry]}`)
    }
}

store(['Orange => 2000',
    'Peach => 1432',
    'Banana => 450',
    'Peach => 600',
    'Strawberry => 549']
);

store(['Kiwi => 234',
'Pear => 2345',
'Watermelon => 3456',
'Kiwi => 4567',
'Pear => 5678',
'Watermelon => 6789']
);