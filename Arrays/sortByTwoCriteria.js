function sorting(arr){
    arr.sort((a, b) => 
    {
        if(a.length < b.length) return -1;
        if(a.length < b.length) return 1;
        if(a.length == b.length){
           return a.localeCompare(b);
        }      
    })
    .forEach(element => console.log(element));
}

sorting(['Isacc', 
'Theodor', 
'Jack', 
'Harrison', 
'George']
);

sorting(['test', 
'Deny', 
'omen', 
'Default']

);