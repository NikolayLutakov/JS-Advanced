function determinateSpeed(speed, area){
    let speedLimit = 0;
    
    switch(area){
        case 'motorway' : speedLimit = 130;
        break;
        case 'interstate' : speedLimit = 90;
        break;
        case 'city' : speedLimit = 50;
        break;
        case 'residential' : speedLimit = 20;
        break;
        default :
        console.log('Invalid area!');
        return;
    }

    let diff = Math.abs(speed - speedLimit);  

    if (speed <= speedLimit){
        console.log(`Driving ${speed} km/h in a ${speedLimit} zone`)
    } else {
        let status = '';

        if(diff <= 20){
            status = 'speeding'
        } else if (diff > 20 && diff <= 40){
            status = 'excessive speeding'
        }
        else{
            status = 'reckless driving'
        }

        console.log(`The speed is ${diff} km/h faster than the allowed speed of ${speedLimit} - ${status}`)
    }
    
}

determinateSpeed(40, 'city');
determinateSpeed(21, 'residential');
determinateSpeed(120, 'interstate');
determinateSpeed(200, 'motorway');
