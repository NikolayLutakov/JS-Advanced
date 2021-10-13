function getFibonator(){
    let firstMember = 0;
    let secMember = 1;
    let flag = true;

    return function get(){
        if(flag){
            flag = false;
            return 1;
            
        }

        let fibNumber = firstMember + secMember;
        firstMember = secMember;
        secMember = fibNumber;
        
        return fibNumber;
    };  
}



let fib = getFibonator();
console.log(fib()); // 1
console.log(fib()); // 1
console.log(fib()); // 2
console.log(fib()); // 3
console.log(fib()); // 5
console.log(fib()); // 8
console.log(fib()); // 13



