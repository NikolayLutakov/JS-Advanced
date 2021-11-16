class SummerCamp{
    constructor(organizer, location){
        this.organizer = organizer;
        this.location = location;
        this.priceForTheCamp = {"child": 150, "student": 300, "collegian": 500};
        this.listOfParticipants = [];
    }

    registerParticipant (name, condition, money){
        if(!this.priceForTheCamp.hasOwnProperty(condition)){
            throw Error('Unsuccessful registration at the camp.')
        }

        if(this.listOfParticipants.find(x => x.name == name)){
            return `The ${name} is already registered at the camp.`
        }

        if(money < this.priceForTheCamp[condition]){
            return `The money is not enough to pay the stay at the camp.`
        }

        this.listOfParticipants.push({
             name,
             condition,
             power: 100,
             wins: 0
        })
        return `The ${name} was successfully registered.`
    }

    unregisterParticipant (name){
        const participant = this.listOfParticipants.find(x => x.name == name);
        const index = this.listOfParticipants.indexOf(participant);
        if(!participant){
            throw Error(`The ${name} is not registered in the camp.`)
        }
        
        this.listOfParticipants.splice(index, 1);
        return `The ${name} removed successfully.`
    }

    timeToPlay (typeOfGame, participant1, participant2){
        if(typeOfGame == 'Battleship'){
            const player = this.listOfParticipants.find(x => x.name == participant1)
            if(!player){
                throw Error('Invalid entered name/s.');
            }

            player.power += 20;
            return `The ${player.name} successfully completed the game Battleship.`;

        } else {
            const player1 = this.listOfParticipants.find(x => x.name == participant1);
            const player2 = this.listOfParticipants.find(x => x.name == participant2);

            if(!player1 || !player2){
                throw Error('Invalid entered name/s.');
            }

            if(player1.condition != player2.condition){
                throw Error('Choose players with equal condition.');
            }

            let powerDiff = player1.power - player2.power;
            

            if(powerDiff > 0){
                player1.wins++;
                return `The ${player1.name} is winner in the game WaterBalloonFights.`
            } else if (powerDiff == 0){
                return 'There is no winner.'
            } else {
                player2.wins++;
                return `The ${player2.name} is winner in the game WaterBalloonFights.`
            }
        }
    }

    toString (){
        let result = '';

        result += `${this.organizer} will take ${this.listOfParticipants.length} participants on camping to ${this.location}\n`
        const sorted = this.listOfParticipants.sort((a, b) => b.wins - a.wins);

        for(const part of sorted){
            result += `${part.name} - ${part.condition} - ${part.power} - ${part.wins}\n`
        }
        return result.trimEnd();
    }
}


const summerCamp = new SummerCamp("Jane Austen", "Pancharevo Sofia 1137, Bulgaria");
console.log(summerCamp.toString())
console.log(summerCamp.registerParticipant("Petar Petarson", "student", 300));
console.log(summerCamp.registerParticipant("Petar Petarson1", "student", 300));
console.log(summerCamp.unregisterParticipant("Petar Petarson1"));
console.log(summerCamp.timeToPlay("Battleship", "Petar Petarson"));
console.log(summerCamp.registerParticipant("Sara Dickinson", "child", 200));
//console.log(summerCamp.timeToPlay("WaterBalloonFights", "Petar Petarson", "Sara Dickinson"));
console.log(summerCamp.registerParticipant("Dimitur Kostov", "student", 300));
console.log(summerCamp.timeToPlay("WaterBalloonFights", "Petar Petarson", "Petar Petarson"));




console.log(summerCamp.listOfParticipants)

