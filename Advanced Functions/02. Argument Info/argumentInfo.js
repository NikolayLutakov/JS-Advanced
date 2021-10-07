function getArguments(){
    if(arguments.length == 0){
        return;
    }
    const counter = {};
    const elements = [];
    const sortable = [];
    let result = '';
    for(const element of arguments){
        console.log(typeof(element))
        if(!typeof(element)){
            elements.push([typeof(element), element.toString()])
        } else {
            elements.push([typeof(element), element])
        }
        
        if(counter[typeof(element)] == undefined){
            counter[typeof(element)] = 1;
        } else {
            counter[typeof(element)]++;
        }
        
    }
    for(const prop in counter){
        sortable.push([prop, counter[prop]])
    }
    sortable.sort((a, b) => Number(b[1]) - Number(a[1]));
    for(const element of elements){
        result += `${element[0]}: ${element[1]}\n`
    }
    
    for (const prop of sortable){
        result += `${prop[0]} = ${prop[1]}\n`;
    }

    console.log(result);
}

getArguments(42,'cat', undefined,'fgsfgsd',  25, function () { console.log('Hello world!'); });

