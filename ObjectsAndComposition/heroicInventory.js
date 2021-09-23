function register(input) {
    let result = [];

    let heroes = input.map(a => a.split(' / '));

    for (let hero of heroes) {
        const obj = {};

        obj.name = hero[0];
        obj.level = Number(hero[1]);
        obj.items = hero[2] ? hero[2].split(', ') : [];

        result.push(obj);
    }  

    return JSON.stringify(result);
}

console.log(register(
    ['Isacc / 25 / Apple, GravityGun',
        'Derek / 12 / BarrelVest, DestructionSword',
        'Hes / 1']
))