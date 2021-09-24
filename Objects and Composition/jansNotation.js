function solve(input) {
    let result = [];
    const functions = {
        '+': (a, b) => a + b,
        '-': (a, b) => a - b,
        '*': (a, b) => a * b,
        '/': (a, b) => a / b
    }

    for (const element of input) {
        if (typeof (element) == "number") {
            result.push(element);
        } else {
            let a = result[result.length - 2]
            let b = result[result.length - 1]

            if (a == undefined || b == undefined) {
                console.log('Error: not enough operands!');
                return;
            }

            let calculated = functions[element](a, b);
            result.splice(result.length - 2, 2);
            result.push(calculated);
        }
    }

    if (result.length > 1) {
        console.log('Error: too many operands!');
        return;
    }
    console.log(result[0]);
}

solve([3,
    4,
    '+']
)

solve([5,
    3,
    4,
    '*',
    '-']
)