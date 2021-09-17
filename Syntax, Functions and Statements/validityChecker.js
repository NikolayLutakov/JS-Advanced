function checkValidity(x1, y1, x2, y2){
    const point0 = [0, 0];
    const point1 = [x1, y1];
    const point2 = [x2, y2];

    const distance0 = Math.sqrt((Math.abs(point1[0] - point0[0]) ** 2) + (Math.abs(point1[1] - point0[1]) ** 2))
    const distance1 = Math.sqrt((Math.abs(point2[0] - point0[0]) ** 2) + (Math.abs(point2[1] - point0[1]) ** 2))
    const distance2 = Math.sqrt((Math.abs(point1[0] - point2[0]) ** 2) + (Math.abs(point1[1] - point2[1]) ** 2))

    if(distance0 % 1 != 0){
        console.log(`{${point1[0]}, ${point1[1]}} to {${point0[0]}, ${point0[1]}} is invalid`);
    } else {
        console.log(`{${point1[0]}, ${point1[1]}} to {${point0[0]}, ${point0[1]}} is valid`);
    }

    if(distance1 % 1 != 0){
        console.log(`{${point2[0]}, ${point2[1]}} to {${point0[0]}, ${point0[1]}} is invalid`);
    } else {
        console.log(`{${point2[0]}, ${point2[1]}} to {${point0[0]}, ${point0[1]}} is valid`);
    }

    if(distance2 % 1 != 0){
        console.log(`{${point1[0]}, ${point1[1]}} to {${point2[0]}, ${point2[1]}} is invalid`);
    } else {
        console.log(`{${point1[0]}, ${point1[1]}} to {${point2[0]}, ${point2[1]}} is valid`);
    }
    
}

checkValidity(3, 0, 0, 4);
checkValidity(2, 1, 1, 1);