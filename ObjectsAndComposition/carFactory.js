function assembleCar(requirements){
    const car = {};
    const engines = [
        { power: 90, volume: 1800 },
        { power: 120, volume: 2400 },
        { power: 200, volume: 3500 },
    ];

    car.model = requirements.model;
    if(requirements.power <= 90){
        car.engine = engines[0];
    } else if (requirements.power > 90 && requirements.power <= 120) {
        car.engine = engines[1];
    } else {
        car.engine = engines[2];
    }
    car.carriage = {type: requirements.carriage, color: requirements.color}
    
    let wheelSize = requirements.wheelsize
    if(wheelSize % 2 == 0){
        wheelSize -= 1;
    }
    car.wheels = Array.from(Array(4));
    car.wheels.fill(wheelSize, 0, 4);

   return car;
}

console.log(assembleCar({ model: 'VW Golf II', power: 90, color: 'blue', carriage: 'hatchback', wheelsize: 14 }));