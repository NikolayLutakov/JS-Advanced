function sortNames(arr){
    arr.sort((a, b) => a.localeCompare(b))
    .map((v, i) => `${i + 1}.${v}`)
    .forEach(element => console.log(element));
}

sortNames(["John", "Bob", "Christina", "Ema"]);