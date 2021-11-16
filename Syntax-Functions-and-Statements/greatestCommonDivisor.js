function gcd(numberOne, numberTwo){
    if (numberOne == 0){
        console.log(numberTwo);
    } else if (numberTwo == 0){
        console.log(numberOne);
    }

    while (numberOne != numberTwo) {
        if (numberOne > numberTwo){
            numberOne = numberOne - numberTwo;
        } else {
            numberTwo = numberTwo - numberOne;
        }
    }
    console.log(numberOne);
}

gcd(15, 5)