function cook(element, o1, o2, o3, o4, o5){
    let number = parseInt(element);
    let operations = [o1, o2, o3, o4, o5];

    for(let i = 0; i < 5; i++){
        switch (operations[i]){
            case 'chop' : number /= 2
            break;
            case 'dice' : number = Math.sqrt(number)
            break;
            case 'spice' : number += 1
            break;
            case 'bake' : number *= 3
            break;
            case 'fillet' : number = number - (number * 0.20)
            break;
        }
        console.log(number);
    }
}

cook('32', 'chop', 'chop', 'chop', 'chop', 'chop')
cook('9', 'dice', 'spice', 'chop', 'bake', 'fillet')