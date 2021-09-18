function addRemove(commands){
    let number = 1;
    const arr = [];

    for(let i = 0; i < commands.length; i++){
        const cmd = commands[i];
        if(cmd == 'add'){
            arr.push(number);
        } else {
            arr.pop();
        }
        number++;
    }
    if(arr.length == 0){
        console.log('Empty');
    } else {
        console.log(arr.join('\n'));
    }
}

addRemove(['add', 
'add', 
'add', 
'add']
);
addRemove(['add', 
'add', 
'remove', 
'add', 
'add']
);
addRemove(['remove', 
'remove', 
'remove']
);