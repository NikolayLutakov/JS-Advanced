function add(a) {
    let sum = 0;
    sum += a;

    function internal(a) {
        sum += a;
        return internal;
    }

    internal.toString = () => sum;

    return internal;
}

console.log(add(1)(2)(5).toString());