function upper(input){
    
    const regex = /[A-Za-z0-9]{1,}/g;
    const words = input.match(regex);
    let output = '';

    if(words != null){
        output = words.join(', ').toUpperCase();
    }
    console.log(output);
}

upper('Hi, how are you?');
upper('hello');
upper('');