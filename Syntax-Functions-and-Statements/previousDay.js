function calcPrevDay(year, month, day){
    let date = new Date(year, month - 1, day);
    date.setDate(date.getDate() - 1);
    console.log(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`);
}

calcPrevDay(2016, 9, 30);
calcPrevDay(2016, 10, 1);
