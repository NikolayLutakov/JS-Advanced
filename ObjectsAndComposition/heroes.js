function solve() {
    return {
        mage: (_name) => {
            return mage = {
                name: _name,
                health: 100,
                mana: 100,
                cast: (spell) =>
                {
                    mage.mana -= 1;
                    console.log(`${mage.name} cast ${spell}`) 
                }
            }
        },
        fighter: (_name) => {
            return fighter = {
                name: _name,
                health: 100,
                stamina: 100,
                fight: () =>
                {
                    fighter.stamina -= 1;
                    console.log(`${fighter.name} slashes at the foe!`) 
                }
            }
        }
    }
}

let create = solve();
const scorcher = create.mage("Scorcher");
scorcher.cast("fireball")
scorcher.cast("thunder")
scorcher.cast("light")

const scorcher2 = create.fighter("Scorcher 2");
scorcher2.fight()

console.log(scorcher2.stamina);
console.log(scorcher.mana);

