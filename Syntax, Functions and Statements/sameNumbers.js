function sameNumber(number){
    let numbers = [];
    let flag = true;
    let sum = 0;

    while(number != 0){
        numbers.push(number % 10);
        number = Math.floor(number / 10);
    }

    for(let i = 0; i < numbers.length - 1; i++){
        let cur = numbers[i];
        let next = numbers[i+1];
        
        if(cur != next){
            flag = false;
        }

        sum += cur;
        
        if(i == numbers.length - 2){
            sum += next;
        }
    }
    console.log(flag);
    console.log(sum);
}

sameNumber(2222222)

function sameNumberV2(number){
    let numbersString = number.toString();
    let flag = true;
    let sum = 0;

    for (let i = 0; i < numbersString.length - 1; i++){
        let cur = numbersString[i];
        let next = numbersString[i+1];
        
        if(cur != next){
            flag = false;
        }

        sum += parseInt(cur);
        
        if(i == numbersString.length - 2){
            sum += parseInt(next);
        }
    }

    console.log(flag);
    console.log(sum);
}

sameNumberV2(2222222)